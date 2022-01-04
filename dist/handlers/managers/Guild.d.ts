/// <reference types="node" />
import Client from '../../index';
import FormData, { Stream } from 'form-data';
declare interface GuildChannel {
    id: number;
    guild_id: string;
    master_id: string;
    parent_id: number;
    name: string;
    topic: string;
    type: number;
    level: number;
    slow_mode: number;
    is_category: boolean;
}
declare interface GuildRole {
    role_id: number;
    name: string;
    color: number;
    position: number;
    hoist: number;
    mentionable: number;
    permissions: number;
}
declare interface FullGuild {
    roles: GuildRole[];
    channels: GuildChannel[];
    id: string;
    name: string;
    topic: string;
    master_id: string;
    icon: string;
    notify_type: number;
    region: string;
    enable_open: boolean;
    open_id: string;
    default_channel_id: string;
    welcome_channel_id: string;
    boost_num: number;
    level: number;
}
declare interface Guild {
    id: string;
    name: string;
    topic: string;
    master_id: string;
    icon: string;
    notify_type: number;
    region: string;
    enable_open: false;
    open_id: string;
    default_channel_id: string;
    welcome_channel_id: string;
    boost_num: number;
    level: number;
}
declare interface Guilds {
    items: Guild[];
    meta: {
        page: number;
        page_total: number;
        page_size: number;
        total: number;
    };
    sort: {
        id: number;
    };
}
declare interface GuildUser {
    id: string;
    username: string;
    identify_num: string;
    online: boolean;
    status: number;
    bot: boolean;
    avatar: string;
    vip_avatar: string;
    nickname: string;
    roles: number[];
}
declare interface GuildUserList {
    items: GuildUser[];
    meta: {
        page: number;
        page_total: number;
        page_size: number;
        total: number;
    };
    sort: {
        id: number;
    };
    user_count: number;
    online_count: number;
    offline_count: number;
}
declare interface MuteAndDeaf {
    mic: {
        type: 1;
        user_ids: string[];
    };
    headset: {
        type: 2;
        user_ids: string[];
    };
}
declare interface GuildEmoji {
    name: string;
    id: string;
    user_info: {
        id: string;
        username: string;
        identify_num: string;
        online: boolean;
        os: string;
        status: number;
        avatar: string;
    };
}
declare interface GuildEmojiList {
    items: GuildEmoji[];
    meta: {
        page: number;
        page_total: number;
        page_size: number;
        total: number;
    };
    sort: {
        id: number;
    };
}
declare interface GuildInvite {
    channel_id: string;
    guild_id: string;
    url_code: string;
    url: string;
    user: {
        id: string;
        username: string;
        identify_num: string;
        online: boolean;
        status: number;
        bot: boolean;
        avatar: string;
        vip_avatar: string;
    };
}
declare interface GuildInvites {
    items: GuildInvite[];
    meta: {
        page: number;
        page_total: number;
        page_size: number;
        total: number;
    };
    sort: {};
}
declare interface GuildBlacklistUser {
    user_id: string;
    created_time: number;
    remark: string;
    user: {
        id: string;
        username: string;
        identify_num: string;
        online: boolean;
        os: string;
        status: number;
        avatar: string;
        vip_avatar: string;
        banner: string;
        nickname: string;
        roles: number[];
        is_vip: boolean;
        bot: boolean;
    };
}
declare interface GuildBlacklistList {
    items: GuildBlacklistUser[];
    meta: {
        page: number;
        page_total: number;
        page_size: number;
        total: number;
    };
    sort: {};
}
declare class GuildEmojiManager {
    #private;
    constructor(client: Client);
    list(guildId: string, { page, pageSize }: {
        page?: number;
        pageSize?: number;
    }): Promise<GuildEmojiList>;
    create(name: string, guildId: string, emoji: Buffer | Stream, uploadOptions?: FormData.AppendOptions): Promise<GuildEmoji>;
    update(name: string, emojiId: string): Promise<void>;
    delete(emojiId: string): Promise<void>;
}
declare class GuildInviteManager {
    #private;
    constructor(client: Client);
    list(targetId: string, { targetType, page, pageSize, }: {
        targetType: 'CHANNEL' | 'GUILD';
        page?: number;
        pageSize?: number;
    }): Promise<GuildInvites>;
    create(targetId: string, { duration, settingTimes, targetType, }: {
        targetType: 'CHANNEL' | 'GUILD';
        duration: 'LIFETIME' | 'HALF_HOUR' | 'ONE_HOUR' | 'SIX_HOURS' | 'TWELVE_HOURS' | 'ONE_DAY' | 'SEVEN_DAYS';
        settingTimes?: 'UNLIMITED' | 'ONE_USE' | 'FIVE_USES' | 'TEN_USES' | 'TWENTY_FIVE_USES' | 'FIFTY_USES' | 'HUNDRED_USES';
    }): Promise<string>;
    delete(urlCode: string, targetId: string, { targetType, }: {
        targetType: 'CHANNEL' | 'GUILD';
    }): Promise<void>;
}
declare class GuildBlacklistManager {
    #private;
    constructor(client: Client);
    list(guildId: string): Promise<GuildBlacklistList>;
    create(guildId: string, userId: string, { remark, delMsgDays, }: {
        remark?: string;
        delMsgDays?: 'ONE_DAY' | 'SEVEN_DAYS' | 'DONT_DElETE';
    }): Promise<import("axios").AxiosResponse<any>>;
    delete(guildId: string, userId: string): Promise<import("axios").AxiosResponse<any>>;
}
export default class GuildManager {
    #private;
    emoji: GuildEmojiManager;
    invite: GuildInviteManager;
    blacklist: GuildBlacklistManager;
    constructor(client: Client);
    list({ page, pageSize, sort, }: {
        page?: number;
        pageSize?: number;
        sort?: 'DESC' | 'ASC';
    }): Promise<Guilds>;
    view(guildId: string): Promise<FullGuild>;
    userList(guildId: string, { channelId, search, roleId, mobileVerified, activeTime, joinedAt, page, pageSize, filterUserId, }: {
        channelId?: string;
        search?: string;
        roleId?: number;
        mobileVerified?: number;
        activeTime?: number;
        joinedAt?: number;
        page?: number;
        pageSize?: number;
        filterUserId?: string;
    }): Promise<GuildUserList>;
    setNickname(guildId: string, userId: string, nickname: string): Promise<import("axios").AxiosResponse<any>>;
    leave(guildId: string): Promise<import("axios").AxiosResponse<any>>;
    kick(guildId: string, targetId: string): Promise<import("axios").AxiosResponse<any>>;
    getMuteAndDeaf(guildId: string, returnType?: string): Promise<MuteAndDeaf>;
    private addMuteOrDeaf;
    private removeMuteOrDeaf;
    mute(guildId: string, userId: string): Promise<import("axios").AxiosResponse<any>>;
    deaf(guildId: string, userId: string): Promise<import("axios").AxiosResponse<any>>;
    unmute(guildId: string, userId: string): Promise<import("axios").AxiosResponse<any>>;
    undeaf(guildId: string, userId: string): Promise<import("axios").AxiosResponse<any>>;
}
export {};
