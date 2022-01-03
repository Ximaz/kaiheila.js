export interface Emoji {
    id: string;
    name: string;
}
export interface Body {
    emoji: Emoji;
    user_id: string;
    chat_code: string;
    msg_id: string;
}
export interface Extra {
    type: string;
    body: Body;
}
export default interface DeletedPrivateReaction {
    channel_type: string;
    type: number;
    target_id: string;
    author_id: string;
    content: string;
    extra: Extra;
    msg_id: string;
    msg_timestamp: number;
    nonce: string;
    verify_token: string;
}
