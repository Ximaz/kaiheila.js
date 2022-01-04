"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Router_1 = __importDefault(require("../typings/Router"));
const BASE_URL = `https://www.kaiheila.cn/api`;
let cookie = '';
class ApiHandler {
    #handler;
    routes;
    constructor(token, { tokenType = 'BOT', lang = 'en-US' }) {
        this.#handler = axios_1.default.create({
            headers: {
                'Accept-Language': lang,
                Authorization: `${tokenType === 'USER'
                    ? ''
                    : tokenType === 'BEARER'
                        ? 'Bearer'
                        : 'Bot'} ${token}`,
            },
            baseURL: BASE_URL,
        });
        this.routes = new Router_1.default();
    }
    getRoute(route) {
        return { method: route.m, url: `/v${route.v || 3}${route.r}` };
    }
    async execute(route, options) {
        try {
            const { method, url } = this.getRoute(route), headers = {
                ...this.#handler.defaults.headers,
                ...options?.headers,
            };
            if (cookie !== '')
                headers['Cookie'] = cookie;
            const config = {
                method,
                url,
                data: options?.data,
                params: options?.params,
                headers,
            }, response = await this.#handler.request(config), { isRatelimitReached, delay } = this.handleRateLimit(response.headers);
            if (isRatelimitReached) {
                const timeout = setTimeout(() => 0, (delay + 1) * 1000);
                clearInterval(timeout);
                return await this.#handler.request(config);
            }
            if (response.data.code !== 0) {
                throw new Error(`${response.data.message} (Error code : ${response.data.code})`);
            }
            cookie += `${cookie.length > 0 ? ';' : ''}${response.headers['set-cookie']}`;
            return response;
        }
        catch (error) {
            if (error.response?.data)
                throw new Error(JSON.stringify(error.response.data));
            throw error;
        }
    }
    handleRateLimit(ratelimitHeaders) {
        return {
            isRatelimitReached: ratelimitHeaders['X-Rate-Limit-Remaining'] === '0',
            delay: parseInt(ratelimitHeaders['X-Rate-Limit-Reset']) /
                parseInt(ratelimitHeaders['X-Rate-Limit-Limit']),
        };
    }
}
exports.default = ApiHandler;
