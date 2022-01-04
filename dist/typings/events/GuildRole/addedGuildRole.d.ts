export interface Body {
    role_id: number;
    name: string;
    color: number;
    position: number;
    hoist: number;
    mentionable: number;
    permissions: number;
}
export interface Extra {
    type: string;
    body: Body;
}
export default interface AddedRole {
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
