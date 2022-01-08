import { Client } from '../../index'
import API from '../API'
import { BitFields, Bits } from './index'
import Role from '../../typings/objects/Role'

declare enum RoleSettings {
    HOISTED = 1,
    MENTIONNABLE = 1,
    NO_HOISTED = 0,
    NO_MENTIONNABLE = 0,
}

declare interface Roles {
    items: Role[]
    meta: {
        page: number
        page_total: number
        page_size: number
        total: number
    }
    sort: {
        id: number
    }
}

export default class RoleManager {
    #API: API
    #routes: API['routes']
    constructor(client: Client) {
        this.#API = new API(client.token, client.options)
        this.#routes = this.#API.routes
    }

    async list(
        guildId: string,
        options?: { page?: number; pageSize?: number }
    ) {
        return (
            await this.#API.execute(this.#routes.roleList, {
                params: {
                    guild_id: guildId,
                    page: options?.page,
                    page_size: options?.pageSize,
                },
            })
        ).data.data as Roles
    }

    async create(
        guildId: string,
        name: string,
        options?: {
            hoist?: boolean
            mentionnable?: boolean
            color?: number
            permissions?: BitFields[]
        }
    ) {
        const response = (
            await this.#API.execute(this.#routes.roleCreate, {
                data: { guild_id: guildId, name },
            })
        ).data.data as Role
        if (
            !options?.hoist &&
            !options?.mentionnable &&
            !options?.color &&
            !options?.permissions
        )
            return response
        return this.update(guildId, response.role_id, options)
    }

    async update(
        guildId: string,
        roleId: number,
        options?: {
            hoist?: boolean
            mentionnable?: boolean
            color?: number
            permissions?: BitFields[] | number
            name?: string
        }
    ) {
        let pFlags = 0
        if (options?.permissions) {
            if (Array.isArray(options.permissions)) {
                for (const p of options.permissions) {
                    pFlags += Bits[p]
                }
            }
        }
        return (
            await this.#API.execute(this.#routes.roleUpdate, {
                data: {
                    guild_id: guildId,
                    role_id: roleId,
                    permissions: options?.permissions ? pFlags : undefined,
                    color: options?.color,
                    name: options?.name,
                    hoist:
                        options?.hoist !== undefined
                            ? options?.hoist
                                ? 1
                                : 0
                            : undefined,
                    mentionnable:
                        options?.mentionnable !== undefined
                            ? options?.mentionnable
                                ? 1
                                : 0
                            : undefined,
                },
            })
        ).data.data as Role
    }

    async delete(guildId: string, roleId: number) {
        return await this.#API.execute(this.#routes.roleDelete, {
            data: { guild_id: guildId, role_id: roleId },
        })
    }

    async assign(
        guildId: string,
        roleId: string,
        userId: string
    ): Promise<{
        user_id: string
        guild_id: string
        roles: number[]
    }> {
        return (
            await this.#API.execute(this.#routes.roleGrant, {
                data: {
                    guild_id: guildId,
                    role_id: roleId,
                    user_id: userId,
                },
            })
        ).data.data
    }

    async remove(
        guildId: string,
        roleId: string,
        userId: string
    ): Promise<{
        user_id: string
        guild_id: string
        roles: number[]
    }> {
        return (
            await this.#API.execute(this.#routes.roleRevoke, {
                data: {
                    guild_id: guildId,
                    role_id: roleId,
                    user_id: userId,
                },
            })
        ).data.data
    }
}
