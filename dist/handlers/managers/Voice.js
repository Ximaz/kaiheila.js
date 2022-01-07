"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = __importDefault(require("../API"));
const ws_1 = __importDefault(require("ws"));
class VoiceManager {
    #client;
    #API;
    #socket;
    dispatcher;
    constructor(client) {
        this.#client = client;
        this.#API = new API_1.default(client.token, client.options);
        this.#socket = undefined;
    }
    async join(channelId) {
        const { gateway_url } = (await this.#API.execute({
            m: 'post',
            r: '/channels/token/' + channelId,
            v: 2,
        }, {
            data: { ip_discovery: [] },
            headers: {
                'x-client-sessionid': this.#client.sessionId,
            },
        })).data;
        this.#socket = new ws_1.default(gateway_url);
        return this.#socket;
    }
}
exports.default = VoiceManager;
