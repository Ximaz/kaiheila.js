export default class User {
    id: string;
    username: string;
    identify_num: string;
    online: boolean;
    avatar: string;
    vip_avatar: string;
    bot: boolean;
    status: number;
    nickname: string;
    mobile_verified?: boolean;
    roles?: number[];
    os?: string;
    joined_at?: number;
    active_time?: number;
    constructor();
}
