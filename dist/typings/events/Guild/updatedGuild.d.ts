export interface Body {
    id: string;
    name: string;
    user_id: string;
    icon: string;
    notify_type: number;
    region: string;
    enable_open: number;
    open_id: number;
    default_channel_id: string;
    welcome_channel_id: string;
}
export interface Extra {
    type: string;
    body: Body;
}
export default interface UpdatedGuild {
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
