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
    async list(guildId, { page, pageSize }) {
        return (await this.#API.execute(this.#routes.roleList, {
            params: {
                guild_id: guildId,
                page,
                page_size: pageSize,
            },
        })).data.data;
    }
    async create(guildId, name, { hoist, mentionnable, color, permissions, }) {
        const response = (await this.#API.execute(this.#routes.roleCreate, {
            data: { guild_id: guildId, name },
        })).data.data;
        if (!hoist && !mentionnable && !color && !permissions)
            return response;
        return this.update(guildId, response.role_id, {
            hoist,
            mentionnable,
            color,
            permissions,
            name,
        });
    }
    async update(guildId, roleId, { hoist, mentionnable, color, permissions, name, }) {
        let pFlags = 0;
        if (permissions) {
            for (const p of permissions) {
                pFlags += index_1.Bits[p];
            }
        }
        return (await this.#API.execute(this.#routes.roleUpdate, {
            data: {
                guild_id: guildId,
                role_id: roleId,
                permissions: permissions ? pFlags : undefined,
                color,
                name,
                hoist: hoist !== undefined ? (hoist ? 1 : 0) : undefined,
                mentionnable: mentionnable !== undefined
                    ? mentionnable
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
