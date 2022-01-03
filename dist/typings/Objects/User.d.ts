export default interface User {
    id: string;
    username: string;
    identify_num: string;
    online: boolean;
    avatar: string;
    vip_avatar: string;
    bot: boolean;
    status: number;
    mobile_verified: boolean;
    nickname: string;
    roles?: number[];
    os?: string;
    joined_at?: number;
    active_time?: number;
}
