import { Client } from '../../index';
import { BitFields } from './index';
import Role from '../../typings/objects/Role';
declare interface Roles {
    items: Role[];
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
export default class RoleManager {
    #private;
    constructor(client: Client);
    list(guildId: string, options?: {
        page?: number;
        pageSize?: number;
    }): Promise<Roles>;
    create(guildId: string, name: string, options?: {
        hoist?: boolean;
        mentionnable?: boolean;
        color?: number;
        permissions?: BitFields[];
    }): Promise<Role>;
    update(guildId: string, roleId: number, options?: {
        hoist?: boolean;
        mentionnable?: boolean;
        color?: number;
        permissions?: BitFields[] | number;
        name?: string;
    }): Promise<Role>;
    delete(guildId: string, roleId: number): Promise<import("axios").AxiosResponse<any>>;
    assign(guildId: string, roleId: string, userId: string): Promise<{
        user_id: string;
        guild_id: string;
        roles: number[];
    }>;
    remove(guildId: string, roleId: string, userId: string): Promise<{
        user_id: string;
        guild_id: string;
        roles: number[];
    }>;
}
export {};
