export interface Body {
    guild_id: string;
}
export interface Extra {
    type: string;
    body: Body;
}
export default interface SelfExitedGuild {
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
