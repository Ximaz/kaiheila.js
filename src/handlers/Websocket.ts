import { isArrayBuffer } from 'util/types'
import ws from 'ws'
import { inflateSync } from 'zlib'
import {
    DefaultResponse,
    ErrorCodes,
    EventType,
    Options,
} from '../typings/handlers/Websocket'

const WebSocketOptions: Options = { maxRetry: 2, retry: true }

export default class ClientWebSocket {
    #attempts: number
    socket: ws
    sn: number
    interval: NodeJS.Timeout
    sessionId: string
    reopenSession: boolean
    constructor(
        socketURL: string,
    ) {
        this.socket = new ws(socketURL)
        this.sn = 0
        this.#attempts = 0
        this.interval = setTimeout(() => 0)
        this.sessionId = ''
        this.reopenSession = true
    }

    send(body: any) {
        try {
            this.socket.send(JSON.stringify(body))
        } catch (e) {
            throw new Error(`WebSocket Heartbeat error : ${e}`)
        }
    }

    sendHeartBeat() {
        let time = 6000
        try {
            this.send({ s: EventType.PING, sn: this.sn })
            this.#attempts = 0
        } catch (error) {
            if (this.#attempts > WebSocketOptions.maxRetry || !WebSocketOptions.retry) {
                this.reopenSession = false
                this.socket.close()
                throw error
            }

            switch (this.#attempts++) {
                case 1:
                    time = 2000
                    break
                case 2:
                    time = 4000
                    break
            }
        }

        this.interval = setTimeout(this.sendHeartBeat, time)
    }

    parseResponse(event: any): DefaultResponse {
        if (isArrayBuffer(event)) {
            event = new TextDecoder('utf-8').decode(event)
        }

        if (Buffer.isBuffer(event)) {
            try {
                event = inflateSync(event).toString('utf-8')
            } catch (e) {
                throw new Error(`WebSocket Event decompression error : ${e}`)
            }
        }

        let response: DefaultResponse
        try {
            response = JSON.parse(event)
        } catch (e) {
            throw new Error(`WebSocket Event deserialization error : ${e}`)
        }

        if (!response.d) return response
        const code = response.d.code
        switch (code) {
            case ErrorCodes.MISSING_PARAMS:
                throw new Error('Missing params.')
            case ErrorCodes.INVALID_TOKEN:
                throw new Error('Invalid token provided.')
            case ErrorCodes.TOKEN_EXPIRED:
                throw new Error('The provided token expired.')
            case ErrorCodes.TOKEN_VERIFICATION_FAILED:
                throw new Error('Token verification failed.')
            default:
                break
        }
        return response
    }
}
