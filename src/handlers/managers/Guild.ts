import Client from '../../index'
import API from '../API'
import FormData, { Stream } from 'form-data'

declare interface GuildChannel {
    id: number
    guild_id: string
    master_id: string
    parent_id: number
    name: string
    topic: string
    type: number
    level: number
    slow_mode: number
    is_category: boolean
}

declare interface GuildRole {
    role_id: number
    name: string
    color: number
    position: number
    hoist: number
    mentionable: number
    permissions: number
}

declare interface FullGuild {
    roles: GuildRole[]
    channels: GuildChannel[]
    id: string
    name: string
    topic: string
    master_id: string
    icon: string
    notify_type: number
    region: string
    enable_open: boolean
    open_id: string
    default_channel_id: string
    welcome_channel_id: string
    boost_num: number
    level: number
}

declare interface Guild {
    id: string
    name: string
    topic: string
    master_id: string
    icon: string
    notify_type: number
    region: string
    enable_open: false
    open_id: string
    default_channel_id: string
    welcome_channel_id: string
    boost_num: number
    level: number
}

declare interface Guilds {
    items: Guild[]
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
declare interface GuildUser {
    id: string
    username: string
    identify_num: string
    online: boolean
    status: number
    bot: boolean
    avatar: string
    vip_avatar: string
    nickname: string
    roles: number[]
}

declare interface GuildUserList {
    items: GuildUser[]
    meta: {
        page: number
        page_total: number
        page_size: number
        total: number
    }
    sort: {
        id: number
    }
    user_count: number
    online_count: number
    offline_count: number
}

declare interface MuteAndDeaf {
    mic: {
        type: 1
        user_ids: string[]
    }
    headset: {
        type: 2
        user_ids: string[]
    }
}

declare interface GuildEmoji {
    name: string
    id: string
    user_info: {
        id: string
        username: string
        identify_num: string
        online: boolean
        os: string
        status: number
        avatar: string
    }
}

declare interface GuildEmojiList {
    items: GuildEmoji[]
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

declare interface GuildInvite {
    channel_id: string
    guild_id: string
    url_code: string
    url: string
    user: {
        id: string
        username: string
        identify_num: string
        online: boolean
        status: number
        bot: boolean
        avatar: string
        vip_avatar: string
    }
}

declare interface GuildInvites {
    items: GuildInvite[]
    meta: {
        page: number
        page_total: number
        page_size: number
        total: number
    }
    sort: {}
}

declare interface GuildBlacklistUser {
    user_id: string
    created_time: number
    remark: string
    user: {
        id: string
        username: string
        identify_num: string
        online: boolean
        os: string
        status: number
        avatar: string
        vip_avatar: string
        banner: string
        nickname: string
        roles: number[]
        is_vip: boolean
        bot: boolean
    }
}

declare interface GuildBlacklistList {
    items: GuildBlacklistUser[]
    meta: {
        page: number
        page_total: number
        page_size: number
        total: number
    }
    sort: {}
}

class GuildEmojiManager {
    #API: API
    #routes: API['routes']
    constructor(client: Client) {
        this.#API = new API(client.token, client.options)
        this.#routes = this.#API.routes
    }

    async list(
        guildId: string,
        { page, pageSize }: { page?: number; pageSize?: number }
    ) {
        return (
            await this.#API.execute(this.#routes.guildEmojiList, {
                params: { guild_id: guildId, page, page_size: pageSize },
            })
        ).data.data as GuildEmojiList
    }

    async create(
        name: string,
        guildId: string,
        emoji: Buffer | Stream,
        uploadOptions?: FormData.AppendOptions
    ) {
        const form = new FormData()
        form.append('file', emoji, uploadOptions)
        form.append('guild_id', guildId)
        form.append('name', name)
        return (
            await this.#API.execute(this.#routes.guildEmojiCreate, {
                data: form,
                headers: {
                    'content-type': form.getHeaders()['content-type'],
                },
            })
        ).data.data as GuildEmoji
    }

    async update(name: string, emojiId: string) {
        await this.#API.execute(this.#routes.guildEmojiUpdate, {
            data: {
                name,
                id: emojiId,
            },
        })
    }

    async delete(emojiId: string) {
        await this.#API.execute(this.#routes.guildEmojiDelete, {
            data: {
                id: emojiId,
            },
        })
    }
}

class GuildInviteManager {
    #API: API
    #routes: API['routes']
    constructor(client: Client) {
        this.#API = new API(client.token, client.options)
        this.#routes = this.#API.routes
    }

    async list(
        targetId: string,
        {
            targetType,
            page,
            pageSize,
        }: { targetType: 'CHANNEL' | 'GUILD'; page?: number; pageSize?: number }
    ) {
        return (
            await this.#API.execute(this.#routes.inviteList, {
                params: {
                    guild_id: targetType === 'GUILD' ? targetId : undefined,
                    channel_id: targetType === 'CHANNEL' ? targetId : undefined,
                    page,
                    page_size: pageSize,
                },
            })
        ).data.data as GuildInvites
    }

    async create(
        targetId: string,
        {
            duration,
            settingTimes,
            targetType,
        }: {
            targetType: 'CHANNEL' | 'GUILD'
            duration:
                | 'LIFETIME'
                | 'HALF_HOUR'
                | 'ONE_HOUR'
                | 'SIX_HOURS'
                | 'TWELVE_HOURS'
                | 'ONE_DAY'
                | 'SEVEN_DAYS'
            settingTimes?:
                | 'UNLIMITED'
                | 'ONE_USE'
                | 'FIVE_USES'
                | 'TEN_USES'
                | 'TWENTY_FIVE_USES'
                | 'FIFTY_USES'
                | 'HUNDRED_USES'
        }
    ) {
        return (
            await this.#API.execute(this.#routes.inviteCreate, {
                data: {
                    guild_id: targetType === 'GUILD' ? targetId : undefined,
                    channel_id: targetType === 'CHANNEL' ? targetId : undefined,
                    duration:
                        duration === 'SEVEN_DAYS'
                            ? 604800
                            : duration === 'ONE_DAY'
                            ? 86400
                            : duration === 'TWELVE_HOURS'
                            ? 43200
                            : duration === 'SIX_HOURS'
                            ? 21600
                            : duration === 'ONE_HOUR'
                            ? 3600
                            : duration === 'HALF_HOUR'
                            ? 1800
                            : 0,
                    setting_times:
                        settingTimes === 'HUNDRED_USES'
                            ? 100
                            : settingTimes === 'FIFTY_USES'
                            ? 50
                            : settingTimes === 'TWENTY_FIVE_USES'
                            ? 25
                            : settingTimes === 'TEN_USES'
                            ? 10
                            : settingTimes === 'FIVE_USES'
                            ? 5
                            : settingTimes === 'ONE_USE'
                            ? 1
                            : -1,
                },
            })
        ).data.data.url as string
    }

    async delete(
        urlCode: string,
        targetId: string,
        {
            targetType,
        }: {
            targetType: 'CHANNEL' | 'GUILD'
        }
    ) {
        await this.#API.execute(this.#routes.inviteDelete, {
            data: {
                guild_id: targetType === 'GUILD' ? targetId : undefined,
                channel_id: targetType === 'CHANNEL' ? targetId : undefined,
                url_code: urlCode,
            },
        })
    }
}

class GuildBlacklistManager {
    #API: API
    #routes: API['routes']
    constructor(client: Client) {
        this.#API = new API(client.token, client.options)
        this.#routes = this.#API.routes
    }

    async list(guildId: string) {
        return (
            await this.#API.execute(this.#routes.blacklistList, {
                params: { guild_id: guildId },
            })
        ).data.data as GuildBlacklistList
    }

    async create(
        guildId: string,
        userId: string,
        {
            remark,
            delMsgDays,
        }: {
            remark?: string
            delMsgDays?: 'ONE_DAY' | 'SEVEN_DAYS' | 'DONT_DElETE'
        }
    ) {
        await this.#API.execute(this.#routes.blacklistCreate, {
            data: {
                guild_id: guildId,
                user_id: userId,
                remark,
                del_msg_days:
                    delMsgDays === 'SEVEN_DAYS'
                        ? 7
                        : delMsgDays === 'ONE_DAY'
                        ? 1
                        : 0,
            },
        })
    }

    async delete(guildId: string, userId: string) {
        await this.#API.execute(this.#routes.blacklistDelete, {
            data: {
                guild_id: guildId,
                user_id: userId,
            },
        })
    }
}

export default class GuildManager {
    #API: API
    #routes: API['routes']
    emoji
    invite
    blacklist
    constructor(client: Client) {
        this.#API = new API(client.token, client.options)
        this.#routes = this.#API.routes
        this.emoji = new GuildEmojiManager(client)
        this.invite = new GuildInviteManager(client)
        this.blacklist = new GuildBlacklistManager(client)
    }

    /**
     * Get the list of servers joined by the current user.
     *
     */
    async list({
        page,
        pageSize,
        sort,
    }: {
        page?: number
        pageSize?: number
        sort?: 'DESC' | 'ASC'
    }) {
        return (
            await this.#API.execute(this.#routes.guildList, {
                params: { page, pageSize, sort },
            })
        ).data.data as Guilds
    }

    /**
     * Get server details.
     *
     */
    async view(guildId: string) {
        return (
            await this.#API.execute(this.#routes.guild, {
                params: { guild_id: guildId },
            })
        ).data.data as FullGuild
    }

    /**
     * Get the list of users in the server.
     *
     */
    async userList(
        guildId: string,
        {
            channelId,
            search,
            roleId,
            mobileVerified,
            activeTime,
            joinedAt,
            page,
            pageSize,
            filterUserId,
        }: {
            channelId?: string
            search?: string
            roleId?: number
            mobileVerified?: number
            activeTime?: number
            joinedAt?: number
            page?: number
            pageSize?: number
            filterUserId?: string
        }
    ) {
        return (
            await this.#API.execute(this.#routes.guildUserList, {
                params: {
                    guild_id: guildId,
                    channel_id: channelId,
                    search: search,
                    role_id: roleId,
                    mobile_verified: mobileVerified,
                    active_time: activeTime,
                    joined_at: joinedAt,
                    page: page,
                    page_size: pageSize,
                    filter_user_id: filterUserId,
                },
            })
        ).data.data as GuildUserList
    }

    /**
     * Modify the nickname of the user in the server.
     *
     */
    async setNickname(guildId: string, userId: string, nickname: string) {
        if (nickname.length < 2 || nickname.length > 64)
            throw new Error(
                'The nickname must be from 2 to 64 characters long.'
            )
        await this.#API.execute(this.#routes.guildNickname, {
            data: {
                guild_id: guildId,
                user_id: userId,
                nickname,
            },
        })
    }

    /**
     * Leave the server.
     *
     */
    async leave(guildId: string) {
        await this.#API.execute(this.#routes.guildLeave, {
            data: { guild_id: guildId },
        })
    }

    /**
     * Kick the target from the server.
     *
     */
    async kick(guildId: string, targetId: string) {
        await this.#API.execute(this.#routes.guildKickout, {
            data: { guild_id: guildId, target_id: targetId },
        })
    }

    /**
     * Get mute and deaf member in the guild.
     */
    async getMuteAndDeaf(guildId: string, returnType: string = 'detail') {
        return (
            await this.#API.execute(this.#routes.guildMuteList, {
                params: { guild_id: guildId, return_type: returnType },
            })
        ).data.data as MuteAndDeaf
    }

    private async addMuteOrDeaf(guildId: string, userId: string, type: 1 | 2) {
        await this.#API.execute(this.#routes.guildMuteCreate, {
            data: { guild_id: guildId, user_id: userId, type },
        })
    }

    private async removeMuteOrDeaf(
        guildId: string,
        userId: string,
        type: 1 | 2
    ) {
        await this.#API.execute(this.#routes.guildMuteDelete, {
            data: { guild_id: guildId, user_id: userId, type },
        })
    }

    /**
     * Mute a member in the guild.
     *
     */
    async mute(guildId: string, userId: string) {
        return await this.addMuteOrDeaf(guildId, userId, 1)
    }

    /**
     * Deaf a member in the guild.
     *
     */
    async deaf(guildId: string, userId: string) {
        return await this.addMuteOrDeaf(guildId, userId, 2)
    }

    /**
     * Unmute a member in the guild.
     *
     */
    async unmute(guildId: string, userId: string) {
        return await this.removeMuteOrDeaf(guildId, userId, 1)
    }

    /**
     * Undeaf a member in the guild.
     *
     */
    async undeaf(guildId: string, userId: string) {
        return await this.removeMuteOrDeaf(guildId, userId, 2)
    }
}
