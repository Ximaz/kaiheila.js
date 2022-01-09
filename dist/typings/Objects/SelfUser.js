"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SelfUser {
    id;
    username;
    identify_num;
    online;
    status;
    avatar;
    bot;
    mobile_verified;
    client_id;
    mobile_prefix;
    mobile;
    invited_count;
    constructor() {
        this.id = '';
        this.username = '';
        this.identify_num = '';
        this.online = false;
        this.status = 0;
        this.avatar = '';
        this.bot = false;
        this.mobile_verified = false;
        this.client_id = '';
        this.mobile_prefix = '';
        this.mobile = '';
        this.invited_count = 0;
    }
}
exports.default = SelfUser;
