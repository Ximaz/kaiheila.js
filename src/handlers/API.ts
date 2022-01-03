import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { ClientTokenType } from '../typings/Client'
import Routes, { Route } from '../typings/Router'

const API_VERSION = 3,
    BASE_URL = `https://www.kaiheila.cn/api/v${API_VERSION}`

export declare interface ApiHandlerOptions {
    tokenType: ClientTokenType
    lang: string
}

class ApiHandler {
    #handler
    routes: Routes
    constructor(
        token: string,
        { tokenType = 'BOT', lang = 'en-US' }: ApiHandlerOptions
    ) {
        this.#handler = axios.create({
            headers: {
                'Accept-Language': lang,
                Authorization: `${
                    tokenType === 'USER'
                        ? ''
                        : tokenType === 'BEARER'
                        ? 'Bearer'
                        : 'Bot'
                } ${token}`,
            },
            baseURL: BASE_URL,
        })
        this.routes = new Routes()
    }

    private getRoute(route: Route) {
        return { method: route.m as Method, url: route.r }
    }

    async execute(
        route: Route,
        options?: {
            headers?: any
            data?: any
            params?: any
        }
    ): Promise<AxiosResponse> {
        try {
            const { method, url } = this.getRoute(route),
                config: AxiosRequestConfig = {
                    method,
                    url,
                    data: options?.data,
                    params: options?.params,
                    headers: {
                        ...this.#handler.defaults.headers,
                        ...options?.headers,
                    },
                },
                response = await this.#handler.request(config),
                { isRatelimitReached, delay } = this.handleRateLimit(
                    response.headers
                )
            if (isRatelimitReached) {
                const timeout = setTimeout(() => 0, (delay + 1) * 1000)
                clearInterval(timeout)
                return await this.#handler.request(config)
            }

            if (response.data.code !== 0) {
                throw new Error(`${response.data.message} (Error code : ${response.data.code})`)
            }

            return response
        } catch (error: any) {
            if (typeof error === "string") throw new Error(error)
            throw new Error(error.response.data)
        }
    }

    private handleRateLimit(ratelimitHeaders: AxiosResponse<any>['headers']) {
        return {
            isRatelimitReached:
                ratelimitHeaders['X-Rate-Limit-Remaining'] === '0',
            delay:
                parseInt(ratelimitHeaders['X-Rate-Limit-Reset']) /
                parseInt(ratelimitHeaders['X-Rate-Limit-Limit']),
        }
    }
}

export default ApiHandler
