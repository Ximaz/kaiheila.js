"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = __importDefault(require("../API"));
class UserManager {
    #API;
    #routes;
    constructor(client) {
        this.#API = new API_1.default(client.token, client.options);
        this.#routes = this.#API.routes;
    }
    async me() {
        return (await this.#API.execute(this.#routes.me)).data.data;
    }
    async view(userId, options) {
        return (await this.#API.execute(this.#routes.userView, {
            params: { user_id: userId, guild_id: options?.guildId },
        })).data.data;
    }
    async offline() {
        return await this.#API.execute(this.#routes.userOffline);
    }
}
exports.default = UserManager;
