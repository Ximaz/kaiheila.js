"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = __importDefault(require("../API"));
class ChannelManager {
    #API;
    #routes;
    constructor(client) {
        this.#API = new API_1.default(client.token, client.options);
        this.#routes = this.#API.routes;
    }
    async list(guildId, options) {
        return (await this.#API.execute(this.#routes.channelList, {
            params: {
                guild_id: guildId,
                page: options?.page,
                page_size: options?.pageSize,
                type: options?.type === "VOICE" ? 2 : 1,
            },
        })).data.data;
    }
    async view(targetId) {
        return (await this.#API.execute(this.#routes.channel, {
            params: { target_id: targetId },
        })).data.data;
    }
    async create(guildId, name, options) {
        return (await this.#API.execute(this.#routes.channelCreate, {
            data: {
                guild_id: guildId,
                name,
                parent_id: options?.parentId,
                type: options?.type === "VOICE" ? 2 : 1,
                limit_amount: options?.limitAmount,
                voice_quality: options?.voiceQuality === "LOW"
                    ? 1
                    : options?.voiceQuality === "HIGH"
                        ? 3
                        : 2,
            },
        })).data.data;
    }
    async delete(targetId) {
        return await this.#API.execute(this.#routes.channelDelete, {
            data: { channel_id: targetId },
        });
    }
    async move(voiceChannelId, userIds) {
        return await this.#API.execute(this.#routes.channelDelete, {
            data: { target_id: voiceChannelId, user_ids: userIds },
        });
    }
    async permissions(targetId) {
        return (await this.#API.execute(this.#routes.channelRoleIndex, {
            params: { channel_id: targetId },
        })).data.data;
    }
    async permissionOverwrite(targetId, options) {
        return (await this.#API.execute(this.#routes.channelRoleCreate, {
            data: {
                target_id: targetId,
                type: options?.type === "ROLE" ? "role_id" : "user_id",
                value: options?.value,
            },
        })).data.data;
    }
    async updatePermissionOverwrite(targetId, options) {
        return (await this.#API.execute(this.#routes.channelRoleUpdate, {
            data: {
                target_id: targetId,
                type: options?.type === "ROLE" ? "role_id" : "user_id",
                value: options?.value,
                allow: options?.allow,
                deny: options?.deny,
            },
        })).data.data;
    }
    async deletePermissionOverwrite(targetId, options) {
        return await this.#API.execute(this.#routes.channelRoleDelete, {
            data: {
                target_id: targetId,
                type: options?.type === "ROLE" ? "role_id" : "user_id",
                value: options?.value,
            },
        });
    }
}
exports.default = ChannelManager;
