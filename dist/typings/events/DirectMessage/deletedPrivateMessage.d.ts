export interface Body {
    chat_code: string;
    msg_id: string;
    author_id: string;
    target_id: string;
    deleted_at: number;
}
export interface Extra {
    type: string;
    body: Body;
}
export default interface DeletedPrivateMessage {
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
