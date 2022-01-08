export interface Body {
    value: string;
    msg_id: string;
    user_id: string;
    target_id: string;
}
export interface Extra {
    type: string;
    body: Body;
}
export default interface MessageBtnClick {
    type: number;
    channel_type: string;
    target_id: string;
    author_id: string;
    content: string;
    msg_id: string;
    msg_timestamp: number;
    nonce: string;
    extra: Extra;
}
