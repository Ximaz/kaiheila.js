"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Role {
    role_id;
    name;
    color;
    position;
    hoist;
    mentionable;
    permissions;
    constructor() {
        this.role_id = 0;
        this.name = '';
        this.color = 0;
        this.position = 0;
        this.hoist = 0;
        this.mentionable = 0;
        this.permissions = 0;
    }
}
exports.default = Role;
