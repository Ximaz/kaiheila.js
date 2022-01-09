"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    username;
    identify_num;
    online;
    avatar;
    vip_avatar;
    bot;
    status;
    nickname;
    mobile_verified;
    roles;
    os;
    joined_at;
    active_time;
    constructor() {
        this.id = '';
        this.username = '';
        this.identify_num = '';
        this.online = false;
        this.avatar = '';
        this.vip_avatar = '';
        this.bot = false;
        this.status = 0;
        this.mobile_verified = false;
        this.nickname = '';
    }
}
exports.default = User;
