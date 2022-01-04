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
    async list(guildId, { page, pageSize, type, }) {
        return (await this.#API.execute(this.#routes.channelList, {
            params: {
                guild_id: guildId,
                page,
                page_size: pageSize,
                type: type === 'VOICE' ? 2 : 1,
            },
        })).data.data;
    }
    async view(targetId) {
        return (await this.#API.execute(this.#routes.channel, {
            params: { target_id: targetId },
        })).data.data;
    }
    async create(guildId, name, { parentId, type, limitAmount, voiceQuality, }) {
        return (await this.#API.execute(this.#routes.channelCreate, {
            data: {
                guild_id: guildId,
                name,
                parent_id: parentId,
                type: type === 'VOICE' ? 2 : 1,
                limit_amount: limitAmount,
                voice_quality: voiceQuality === 'LOW'
                    ? 1
                    : voiceQuality === 'HIGH'
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
    async permissionOverwrite(targetId, { type, value, }) {
        return (await this.#API.execute(this.#routes.channelRoleCreate, {
            data: {
                target_id: targetId,
                type: type === 'ROLE' ? 'role_id' : 'user_id',
                value,
            },
        })).data.data;
    }
    async updatePermissionOverwrite(targetId, { type, value, allow, deny, }) {
        return (await this.#API.execute(this.#routes.channelRoleUpdate, {
            data: {
                target_id: targetId,
                type: type === 'ROLE' ? 'role_id' : 'user_id',
                value,
                allow,
                deny,
            },
        })).data.data;
    }
    async deletePermissionOverwrite(targetId, { type, value, }) {
        return await this.#API.execute(this.#routes.channelRoleDelete, {
            data: {
                target_id: targetId,
                type: type === 'ROLE' ? 'role_id' : 'user_id',
                value,
            },
        });
    }
}
exports.default = ChannelManager;
