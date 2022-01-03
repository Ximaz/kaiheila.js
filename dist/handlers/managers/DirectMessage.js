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
    async list({ chatCode, targetId, msgId, flag, page, pageSize, }) {
        return (await this.#API.execute(this.#routes.directMessageList, {
            params: {
                chat_code: chatCode,
                target_id: targetId,
                msg_id: msgId,
                flag: flag,
                page,
                page_size: pageSize,
            },
        })).data.data;
    }
    async create(content, { type, targetId, chatCode, quote, nonce, }) {
        return (await this.#API.execute(this.#routes.directMessageCreate, {
            data: {
                content,
                type: type === 'KMARKDOWN'
                    ? 9
                    : type === 'CARD_MESSAGE'
                        ? 10
                        : 1,
                chat_code: chatCode,
                target_id: targetId,
                quote,
                nonce,
            },
        })).data.data;
    }
    async update(content, { msgId, quote, }) {
        await this.#API.execute(this.#routes.directMessageUpdate, {
            data: {
                content,
                msg_id: msgId,
                quote,
            },
        });
    }
    async delete(msgId) {
        await this.#API.execute(this.#routes.directMessageDelete, {
            data: {
                msg_id: msgId,
            },
        });
    }
    async listReaction(msgId, { emoji }) {
        return (await this.#API.execute(this.#routes.directMessageListReaction, {
            params: { msg_id: msgId, emoji },
        })).data.data;
    }
    async addReaction(msgId, emoji) {
        await this.#API.execute(this.#routes.directMessageAddReaction, {
            data: { msg_id: msgId, emoji },
        });
    }
    async deleteReaction(msgId, emoji, { userId }) {
        await this.#API.execute(this.#routes.directMessageDeleteReaction, {
            data: { msg_id: msgId, emoji, user_id: userId },
        });
    }
}
exports.default = DirectMessage;
