export interface Body {
    user_id: string;
    event_time: number;
    guilds: string[];
}
export interface Extra {
    type: string;
    body: Body;
}
export default interface GuildMemberOnline {
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
