"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Channel {
    id;
    name;
    user_id;
    guild_id;
    is_category;
    parent_id;
    level;
    slow_mode;
    topic;
    type;
    limit_amount;
    master_id;
    permission_overwrites;
    permission_users;
    permission_sync;
    constructor() {
        this.id = '';
        this.name = '';
        this.user_id = '';
        this.guild_id = '';
        this.is_category = false;
        this.parent_id = '';
        this.level = 0;
        this.slow_mode = 0;
        this.topic = '';
        this.type = 0;
    }
}
exports.default = Channel;
