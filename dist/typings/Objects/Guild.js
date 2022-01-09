"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Guild {
    id;
    name;
    topic;
    master_id;
    icon;
    notify_type;
    region;
    enable_open;
    open_id;
    default_channel_id;
    welcome_channel_id;
    roles;
    channels;
    constructor() {
        this.id = '';
        this.name = '';
        this.topic = '';
        this.master_id = '';
        this.icon = '';
        this.notify_type = 0;
        this.region = '';
        this.enable_open = false;
        this.open_id = '';
        this.default_channel_id = '';
        this.welcome_channel_id = '';
        this.roles = [];
        this.channels = [];
    }
}
exports.default = Guild;
