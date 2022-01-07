"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = __importDefault(require("../API"));
class DirectMessage {
    #API;
    #routes;
    constructor(client) {
        this.#API = new API_1.default(client.token, client.options);
        this.#routes = this.#API.routes;
    }
    async list(options) {
        return (await this.#API.execute(this.#routes.directMessageList, {
            params: {
                chat_code: options?.chatCode,
                target_id: options?.targetId,
                msg_id: options?.msgId,
                flag: options?.flag,
                page: options?.page,
                page_size: options?.pageSize,
            },
        })).data.data;
    }
    async create(content, options) {
        return (await this.#API.execute(this.#routes.directMessageCreate, {
            data: {
                content,
                type: options?.type === "KMARKDOWN"
                    ? 9
                    : options?.type === "CARD_MESSAGE"
                        ? 10
                        : 1,
                chat_code: options?.chatCode,
                target_id: options?.targetId,
                quote: options?.quote,
                nonce: options?.nonce,
            },
        })).data.data;
    }
    async update(content, options) {
        return await this.#API.execute(this.#routes.directMessageUpdate, {
            data: {
                content,
                msg_id: options?.msgId,
                quote: options?.quote,
            },
        });
    }
    async delete(msgId) {
        return await this.#API.execute(this.#routes.directMessageDelete, {
            data: {
                msg_id: msgId,
            },
        });
    }
    async listReaction(msgId, options) {
        return (await this.#API.execute(this.#routes.directMessageListReaction, {
            params: { msg_id: msgId, emoji: options?.emoji },
        })).data.data;
    }
    async addReaction(msgId, emoji) {
        return await this.#API.execute(this.#routes.directMessageAddReaction, {
            data: { msg_id: msgId, emoji },
        });
    }
    async deleteReaction(msgId, emoji, options) {
        return await this.#API.execute(this.#routes.directMessageDeleteReaction, {
            data: { msg_id: msgId, emoji, user_id: options?.userId },
        });
    }
}
exports.default = DirectMessage;
