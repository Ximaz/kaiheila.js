import { BitFields } from '.'
import { Client } from '../../index'
import API from '../API'

declare interface Channel {
    id: string
    master_id: string
    parent_id: string
    name: string
    type: number
    level: number
    limit_amount: number
    is_category: boolean
}

declare interface FullChannel {
    id: string
    guild_id: string
    master_id: string
    parent_id: string
    name: string
    topic: string
    type: number
    level: number
    slow_mode: number
    limit_amount: number
    voice_quality: number
    is_category: boolean
    server_url: string
    server_type?: number
}

declare interface Channels {
    items: Channel[]
    meta: {
        page: number
        page_total: number
        page_size: number
        total: number
    }
    sort: []
}

declare interface ChannelPermissionsOverwrite {
    role_id: number
    allow: number
    deny: number
}

declare interface ChannelPermissionsUser {
    user: {
        id: string
        username: string
        identify_num: string
        online: boolean
        os: string
        status: number
        avatar: string
        mobile_verified: boolean
        nickname: string
        roles: number[]
        joined_at: number
        active_time: number
    }
    allow: number
    deny: number
}

declare interface ChannelPermissions {
    permission_overwrites: ChannelPermissionsOverwrite[]
    permission_users: ChannelPermissionsUser[]
    permission_sync: number
}

export default class ChannelManager {
    #API: API
    #routes: API['routes']
    constructor(client: Client) {
        this.#API = new API(client.token, client.options)
        this.#routes = this.#API.routes
    }

    /**
     * Get channel list.
     *
     */
    async list(
        guildId: string,
        options?: { page?: number; pageSize?: number; type: 'TEXT' | 'VOICE' }
    ) {
        return (
            await this.#API.execute(this.#routes.channelList, {
                params: {
                    guild_id: guildId,
                    page: options?.page,
                    page_size: options?.pageSize,
                    type: options?.type === 'VOICE' ? 2 : 1,
                },
            })
        ).data.data as Channels
    }

    /**
     * Get channel details.
     *
     */
    async view(targetId: string) {
        return (
            await this.#API.execute(this.#routes.channel, {
                params: { target_id: targetId },
            })
        ).data.data as FullChannel
    }

    /**
     * Create channel.
     *
     */
    async create(
        guildId: string,
        name: string,
        options?: {
            parentId?: string
            type?: 'TEXT' | 'VOICE' | number
            limitAmount?: number
            voiceQuality?: 'LOW' | 'NORMAL' | 'HIGH' | number
        }
    ) {
        return (
            await this.#API.execute(this.#routes.channelCreate, {
                data: {
                    guild_id: guildId,
                    name,
                    parent_id: options?.parentId,
                    type: !Number.isNaN(options?.type)
                        ? options?.type
                        : options?.type === 'VOICE'
                        ? 2
                        : 1,
                    limit_amount: options?.limitAmount,
                    voice_quality: !Number.isNaN(options?.type)
                        ? options?.type
                        : options?.voiceQuality === 'LOW'
                        ? 1
                        : options?.voiceQuality === 'HIGH'
                        ? 3
                        : 2,
                },
            })
        ).data.data as FullChannel
    }

    /**
     * Delete channel.
     *
     */
    async delete(targetId: string) {
        return await this.#API.execute(this.#routes.channelDelete, {
            data: { channel_id: targetId },
        })
    }

    /**
     * Move users between voice channels.
     *
     */
    async move(voiceChannelId: string, userIds: string[]) {
        return await this.#API.execute(this.#routes.channelDelete, {
            data: { target_id: voiceChannelId, user_ids: userIds },
        })
    }

    /**
     * Channel role permissions details.
     *
     */
    async permissions(targetId: string) {
        return (
            await this.#API.execute(this.#routes.channelRoleIndex, {
                params: { channel_id: targetId },
            })
        ).data.data as ChannelPermissions
    }

    /**
     * Create channel permissions.
     *
     */
    async permissionOverwrite(
        targetId: string,
        options?: {
            type: 'USER' | 'ROLE'
            value: string
        }
    ): Promise<{
        user_id?: string
        role_id?: string
        allow: number
        deny: number
    }> {
        return (
            await this.#API.execute(this.#routes.channelRoleCreate, {
                data: {
                    target_id: targetId,
                    type: options?.type === 'ROLE' ? 'role_id' : 'user_id',
                    value: options?.value,
                },
            })
        ).data.data
    }

    /**
     * Update channel permissions.
     *
     */
    async updatePermissionOverwrite(
        targetId: string,
        options?: {
            type: 'USER' | 'ROLE'
            value: string
            allow?: BitFields
            deny?: BitFields
        }
    ): Promise<{
        user_id?: string
        role_id?: string
        allow: number
        deny: number
    }> {
        return (
            await this.#API.execute(this.#routes.channelRoleUpdate, {
                data: {
                    target_id: targetId,
                    type: options?.type === 'ROLE' ? 'role_id' : 'user_id',
                    value: options?.value,
                    allow: options?.allow,
                    deny: options?.deny,
                },
            })
        ).data.data
    }

    /**
     * Delete channel permissions.
     *
     */
    async deletePermissionOverwrite(
        targetId: string,
        options?: {
            type: 'USER' | 'ROLE'
            value: string
        }
    ) {
        return await this.#API.execute(this.#routes.channelRoleDelete, {
            data: {
                target_id: targetId,
                type: options?.type === 'ROLE' ? 'role_id' : 'user_id',
                value: options?.value,
            },
        })
    }
}
