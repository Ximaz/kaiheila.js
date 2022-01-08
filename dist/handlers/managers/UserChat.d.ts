import { Client } from '../../index';
declare interface UserChatListItem {
    code: string;
    last_read_time: number;
    latest_msg_time: number;
    unread_count: number;
    target_info: {
        id: string;
        username: string;
        online: boolean;
        avatar: string;
    };
    is_friend?: false;
    is_blocked?: false;
    is_target_blocked?: false;
}
declare interface UserChatList {
    items: UserChatListItem[];
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
export default class UserChatManager {
    #private;
    constructor(client: Client);
    list(options?: {
        page?: number;
        pageSize?: number;
    }): Promise<UserChatList>;
    view(chatCode: string): Promise<UserChatListItem>;
    create(targetId: string): Promise<UserChatListItem>;
    delete(targetId: string): Promise<import("axios").AxiosResponse<any>>;
}
export {};
