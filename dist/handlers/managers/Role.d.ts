import Client from '../../index';
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
    list(guildId: string, { page, pageSize }: {
        page?: number;
        pageSize?: number;
    }): Promise<Roles>;
    create(guildId: string, name: string, { hoist, mentionnable, color, permissions, }: {
        hoist?: boolean;
        mentionnable?: boolean;
        color?: number;
        permissions?: BitFields[];
    }): Promise<Role>;
    update(guildId: string, roleId: number, { hoist, mentionnable, color, permissions, name, }: {
        hoist?: boolean;
        mentionnable?: boolean;
        color?: number;
        permissions?: BitFields[];
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
