"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = __importDefault(require("../API"));
class UserChatManager {
    #API;
    #routes;
    constructor(client) {
        this.#API = new API_1.default(client.token, client.options);
        this.#routes = this.#API.routes;
    }
    async list({ page, pageSize }) {
        return (await this.#API.execute(this.#routes.userChatList, {
            params: {
                page,
                page_size: pageSize,
            },
        })).data.data;
    }
    async view(chatCode) {
        return (await this.#API.execute(this.#routes.userChatView, {
            params: {
                chat_code: chatCode,
            },
        })).data.data;
    }
    async create(targetId) {
        return (await this.#API.execute(this.#routes.userChatCreate, {
            data: {
                target_id: targetId,
            },
        })).data.data;
    }
    async delete(targetId) {
        return await this.#API.execute(this.#routes.userChatCreate, {
            data: {
                target_id: targetId,
            },
        });
    }
}
exports.default = UserChatManager;
