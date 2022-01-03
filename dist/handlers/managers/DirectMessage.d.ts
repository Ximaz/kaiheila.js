import Client from '../../index';
declare interface DirectMessageItem {
    id: string;
    type: number;
    content: string;
    embeds: [];
    attachments: [];
    create_at: number;
    updated_at: number;
    reactions: [];
    author_id: string;
    image_name: string;
    read_status: boolean;
    quote: null;
    mention_info: null;
}
declare interface DirectMessageList {
    items: DirectMessageItem[];
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
declare interface ReactionUser {
    id: string;
    username: string;
    identify_num: string;
    online: boolean;
    status: number;
    avatar: string;
    vip_avatar: string;
    bot: boolean;
    nickname: string;
    reaction_time: number;
}
export default class DirectMessage {
    #private;
    constructor(client: Client);
    list({ chatCode, targetId, msgId, flag, page, pageSize, }: {
        chatCode?: string;
        targetId?: string;
        msgId?: string;
        flag: 'before' | 'around' | 'after';
        page?: number;
        pageSize?: number;
    }): Promise<DirectMessageList>;
    create(content: string, { type, targetId, chatCode, quote, nonce, }: {
        type?: 'TEXT' | 'KMARKDOWN' | 'CARD_MESSAGE';
        targetId?: string;
        chatCode?: string;
        quote?: string;
        nonce?: string;
    }): Promise<{
        msg_id: string;
        msg_timestamp: number;
        nonce: string;
    }>;
    update(content: string, { msgId, quote, }: {
        msgId?: string;
        quote?: string;
    }): Promise<void>;
    delete(msgId: string): Promise<void>;
    listReaction(msgId: string, { emoji }: {
        emoji?: string;
    }): Promise<ReactionUser[]>;
    addReaction(msgId: string, emoji: string): Promise<void>;
    deleteReaction(msgId: string, emoji: string, { userId }: {
        userId?: string;
    }): Promise<void>;
}
export {};
