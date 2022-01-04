"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = __importDefault(require("../API"));
const Card_1 = __importDefault(require("./Card"));
class MessageManager {
    #API;
    #routes;
    #client;
    constructor(client) {
        this.#client = client;
        this.#API = new API_1.default(client.token, client.options);
        this.#routes = this.#API.routes;
    }
    async list(targetId, { msgId, pin, flag, pageSize, }) {
        return (await this.#API.execute(this.#routes.messageList, {
            params: {
                target_id: targetId,
                msg_id: msgId,
                pin,
                flag,
                page_size: pageSize,
            },
        })).data.data;
    }
    async view(msgId) {
        return (await this.#API.execute(this.#routes.messageView, {
            params: {
                msg_id: msgId,
            },
        })).data.data;
    }
    async create(targetId, content, options) {
        if (content instanceof Card_1.default || content instanceof Array) {
            if (!options)
                options = {};
            options.type = 'CARD';
            if (!Array.isArray(content))
                content = [new Card_1.default(this.#client, content)];
            else
                for (let i = 0; i < content.length; i++) {
                    content[i] = new Card_1.default(this.#client, content[i]);
                }
            content = JSON.stringify(content);
        }
        return (await this.#API.execute(this.#routes.messageCreate, {
            data: {
                target_id: targetId,
                content,
                type: typeof content !== 'string' || options?.type === 'CARD'
                    ? 10
                    : options?.type === 'KMARDOWN'
                        ? 9
                        : 1,
                nonce: options?.nonce,
                quote: options?.quote,
                temp_target_id: options?.tempTargetId,
            },
        })).data.data;
    }
    async update(msgId, content, { quote, tempTargetId, }) {
        return await this.#API.execute(this.#routes.messageUpdate, {
            data: {
                msg_id: msgId,
                content,
                quote,
                temp_target_id: tempTargetId,
            },
        });
    }
    async delete(msgId) {
        return await this.#API.execute(this.#routes.messageDelete, {
            data: {
                msg_id: msgId,
            },
        });
    }
    async listReaction(msgId, emoji) {
        return (await this.#API.execute(this.#routes.messageListReaction, {
            params: {
                msg_id: msgId,
                emoji: encodeURIComponent(emoji),
            },
        })).data.data;
    }
    async addReaction(msgId, emoji) {
        return await this.#API.execute(this.#routes.messageAddReaction, {
            data: {
                msg_id: msgId,
                emoji,
            },
        });
    }
    async deleteReaction(msgId, emoji, { userId }) {
        return await this.#API.execute(this.#routes.messageDeleteReaction, {
            data: {
                msg_id: msgId,
                emoji,
                user_id: userId,
            },
        });
    }
}
exports.default = MessageManager;
