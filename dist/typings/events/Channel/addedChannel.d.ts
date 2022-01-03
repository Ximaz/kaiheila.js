export interface User {
    id: string;
    username: string;
    identify_num: string;
    online: boolean;
    os: string;
    status: number;
    avatar: string;
    mobile_verified: boolean;
    nickname: string;
    roles: number[];
    joined_at: number;
    active_time: number;
}
export interface PermissionOverwrite {
    role_id: number;
    allow: number;
    deny: number;
}
export interface PermissionUser {
    user: User;
    allow: number;
    deny: number;
}
export interface Body {
    id: string;
    name: string;
    user_id: string;
    guild_id: string;
    is_category: number;
    parent_id: string;
    level: number;
    slow_mode: number;
    topic: string;
    type: number;
    permission_overwrites: PermissionOverwrite[];
    permission_users: PermissionUser[];
    permission_sync: number;
}
export interface Extra {
    type: string;
    body: Body;
}
export default interface AddedChannel {
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
