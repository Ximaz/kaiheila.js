import { BitFields } from '.';
import { Client } from '../../index';
declare interface Channel {
    id: string;
    master_id: string;
    parent_id: string;
    name: string;
    type: number;
    level: number;
    limit_amount: number;
    is_category: boolean;
}
declare interface FullChannel {
    id: string;
    guild_id: string;
    master_id: string;
    parent_id: string;
    name: string;
    topic: string;
    type: number;
    level: number;
    slow_mode: number;
    limit_amount: number;
    voice_quality: number;
    is_category: boolean;
    server_url: string;
    server_type?: number;
}
declare interface Channels {
    items: Channel[];
    meta: {
        page: number;
        page_total: number;
        page_size: number;
        total: number;
    };
    sort: [];
}
declare interface ChannelPermissionsOverwrite {
    role_id: number;
    allow: number;
    deny: number;
}
declare interface ChannelPermissionsUser {
    user: {
        id: string;
        username: string;
        identify_num: string;
        online: boolean;
        os: string;
        status: number;
        avatar: string;
        mobile_verified: boolean;
        nickname: string;
        roles: number[];
        joined_at: number;
        active_time: number;
    };
    allow: number;
    deny: number;
}
declare interface ChannelPermissions {
    permission_overwrites: ChannelPermissionsOverwrite[];
    permission_users: ChannelPermissionsUser[];
    permission_sync: number;
}
export default class ChannelManager {
    #private;
    constructor(client: Client);
    list(guildId: string, options?: {
        page?: number;
        pageSize?: number;
        type: 'TEXT' | 'VOICE' | 'CATEGORY' | 'ALL';
    }): Promise<Channels>;
    view(targetId: string): Promise<FullChannel>;
    create(guildId: string, name: string, options?: {
        parentId?: string;
        type?: 'TEXT' | 'VOICE' | number;
        limitAmount?: number;
        voiceQuality?: 'LOW' | 'NORMAL' | 'HIGH' | number;
        isCategory?: boolean;
    }): Promise<FullChannel>;
    delete(targetId: string): Promise<import("axios").AxiosResponse<any>>;
    move(voiceChannelId: string, userIds: string[]): Promise<import("axios").AxiosResponse<any>>;
    permissions(targetId: string): Promise<ChannelPermissions>;
    permissionOverwrite(targetId: string, options?: {
        type: 'USER' | 'ROLE';
        value: string;
    }): Promise<{
        user_id?: string;
        role_id?: string;
        allow: number;
        deny: number;
    }>;
    updatePermissionOverwrite(targetId: string, options?: {
        type: 'USER' | 'ROLE';
        value: string;
        allow?: BitFields;
        deny?: BitFields;
    }): Promise<{
        user_id?: string;
        role_id?: string;
        allow: number;
        deny: number;
    }>;
    deletePermissionOverwrite(targetId: string, options?: {
        type: 'USER' | 'ROLE';
        value: string;
    }): Promise<import("axios").AxiosResponse<any>>;
}
export {};
