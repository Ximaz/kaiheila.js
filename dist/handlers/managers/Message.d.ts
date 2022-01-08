import { Client } from "../../index";
import Card from "./Card";
declare interface MessageEmbed {
    type: string;
    url: string;
    origin_url: string;
    av_no: string;
    iframe_path: string;
    duration: number;
    title: string;
    pic: string;
}
declare interface MessageAttachment {
    type: string;
    url: string;
    name: string;
    duration?: string;
    size?: string;
    width?: string;
    height?: string;
}
declare interface MessageReactionUser {
    id: string;
    username: string;
    identify_num: string;
    online: boolean;
    status: number;
    avatar: string;
    bot: boolean;
    tag_info: {
        color: string;
        text: string;
    };
    nickname: string;
    reaction_time: number;
}
declare interface MessageReaction {
    emoji: {
        id: string;
        name: string;
    };
    count: number;
    me: boolean;
}
declare interface MessageAuthor {
    id: string;
    username: string;
    online: boolean;
    avatar: string;
}
declare interface MessageQuote {
    id: string;
    type: number;
    content: string;
    create_at: number;
    author: {
        id: string;
        username: string;
        identify_num: string;
        online: true;
        os: string;
        status: number;
        avatar: string;
        vip_avatar: string;
        nickname: string;
        roles: number[];
        is_vip: boolean;
        bot: boolean;
        mobile_verified: boolean;
        joined_at: number;
        active_time: number;
    };
}
declare interface MessageMentionRole {
    role_id: number;
    name: string;
    color: number;
    position: number;
    hoist: number;
    mentionable: number;
    permissions: number;
}
declare interface MessageMention {
    id: string;
    username: string;
    full_name: string;
    avatar: string;
}
declare interface Message {
    id: string;
    type: number;
    content: string;
    mention: string[];
    mention_all: boolean;
    mention_roles: number[];
    mention_here: boolean;
    embeds?: MessageEmbed[];
    attachments?: MessageAttachment;
    create_at: number;
    updated_at: number;
    reactions?: MessageReaction[];
    author: MessageAuthor;
    image_name?: string;
    read_status: boolean;
    quote?: MessageQuote;
    mention_info: {
        mention_part: MessageMention[];
        mention_role_part: MessageMentionRole[];
    };
}
declare interface MessageList {
    items: Message[];
}
export default class MessageManager {
    #private;
    constructor(client: Client);
    list(targetId: string, options?: {
        msgId: string;
        pin: number;
        flag: "before" | "around" | "after";
        pageSize: number;
    }): Promise<MessageList>;
    view(msgId: string): Promise<Message>;
    create(targetId: string, content: string | Card[] | Card, options?: {
        type?: "KMARDOWN" | "CARD";
        quote?: string;
        nonce?: string;
        tempTargetId?: string;
    }): Promise<{
        msg_id: string;
        msg_timestamp: number;
        nonce: string;
    }>;
    update(msgId: string, content: string, options?: {
        quote?: string;
        tempTargetId?: string;
    }): Promise<import("axios").AxiosResponse<any>>;
    delete(msgId: string): Promise<import("axios").AxiosResponse<any>>;
    listReaction(msgId: string, emoji: string): Promise<MessageReactionUser[]>;
    addReaction(msgId: string, emoji: string): Promise<import("axios").AxiosResponse<any>>;
    deleteReaction(msgId: string, emoji: string, options?: {
        userId?: string;
    }): Promise<import("axios").AxiosResponse<any>>;
}
export {};
