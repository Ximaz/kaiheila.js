"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = __importDefault(require("../API"));
const index_1 = require("./index");
class RoleManager {
    #API;
    #routes;
    constructor(client) {
        this.#API = new API_1.default(client.token, client.options);
        this.#routes = this.#API.routes;
    }
    async list(guildId, options) {
        return (await this.#API.execute(this.#routes.roleList, {
            params: {
                guild_id: guildId,
                page: options?.page,
                page_size: options?.pageSize,
            },
        })).data.data;
    }
    async create(guildId, name, options) {
        const response = (await this.#API.execute(this.#routes.roleCreate, {
            data: { guild_id: guildId, name },
        })).data.data;
        if (!options?.hoist &&
            !options?.mentionnable &&
            !options?.color &&
            !options?.permissions)
            return response;
        return this.update(guildId, response.role_id, options);
    }
    async update(guildId, roleId, options) {
        let pFlags = 0;
        if (options?.permissions) {
            for (const p of options?.permissions) {
                pFlags += index_1.Bits[p];
            }
        }
        return (await this.#API.execute(this.#routes.roleUpdate, {
            data: {
                guild_id: guildId,
                role_id: roleId,
                permissions: options?.permissions ? pFlags : undefined,
                color: options?.color,
                name: options?.name,
                hoist: options?.hoist !== undefined ? (options?.hoist ? 1 : 0) : undefined,
                mentionnable: options?.mentionnable !== undefined
                    ? options?.mentionnable
                        ? 1
                        : 0
                    : undefined,
            },
        })).data.data;
    }
    async delete(guildId, roleId) {
        return await this.#API.execute(this.#routes.roleDelete, {
            data: { guild_id: guildId, role_id: roleId },
        });
    }
    async assign(guildId, roleId, userId) {
        return (await this.#API.execute(this.#routes.roleGrant, {
            data: {
                guild_id: guildId,
                role_id: roleId,
                user_id: userId,
            },
        })).data.data;
    }
    async remove(guildId, roleId, userId) {
        return (await this.#API.execute(this.#routes.roleRevoke, {
            data: {
                guild_id: guildId,
                role_id: roleId,
                user_id: userId,
            },
        })).data.data;
    }
}
exports.default = RoleManager;
