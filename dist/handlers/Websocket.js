"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("util/types");
const ws_1 = __importDefault(require("ws"));
const zlib_1 = require("zlib");
const Websocket_1 = require("../typings/handlers/Websocket");
const WebSocketOptions = { maxRetry: 2, retry: true };
class ClientWebSocket {
    constructor(socketURL) {
        this.socket = new ws_1.default(socketURL);
        this.sn = 0;
        this.#attempts = 0;
        this.interval = setTimeout(() => 0);
        this.sessionId = '';
        this.reopenSession = true;
    }
    #attempts;
    send(body) {
        try {
            this.socket.send(JSON.stringify(body));
        }
        catch (e) {
            throw new Error(`WebSocket Heartbeat error : ${e}`);
        }
    }
    sendHeartBeat() {
        let time = 6000;
        try {
            this.send({ s: Websocket_1.EventType.PING, sn: this.sn });
            this.#attempts = 0;
        }
        catch (error) {
            if (this.#attempts > WebSocketOptions.maxRetry || !WebSocketOptions.retry) {
                this.reopenSession = false;
                this.socket.close();
                throw error;
            }
            switch (this.#attempts++) {
                case 1:
                    time = 2000;
                    break;
                case 2:
                    time = 4000;
                    break;
            }
        }
        this.interval = setTimeout(this.sendHeartBeat, time);
    }
    parseResponse(event) {
        if (types_1.isArrayBuffer(event)) {
            event = new TextDecoder('utf-8').decode(event);
        }
        if (Buffer.isBuffer(event)) {
            try {
                event = zlib_1.inflateSync(event).toString('utf-8');
            }
            catch (e) {
                throw new Error(`WebSocket Event decompression error : ${e}`);
            }
        }
        let response;
        try {
            response = JSON.parse(event);
        }
        catch (e) {
            throw new Error(`WebSocket Event deserialization error : ${e}`);
        }
        if (!response.d)
            return response;
        const code = response.d.code;
        switch (code) {
            case Websocket_1.ErrorCodes.MISSING_PARAMS:
                throw new Error('Missing params.');
            case Websocket_1.ErrorCodes.INVALID_TOKEN:
                throw new Error('Invalid token provided.');
            case Websocket_1.ErrorCodes.TOKEN_EXPIRED:
                throw new Error('The provided token expired.');
            case Websocket_1.ErrorCodes.TOKEN_VERIFICATION_FAILED:
                throw new Error('Token verification failed.');
            default:
                break;
        }
        return response;
    }
}
exports.default = ClientWebSocket;
