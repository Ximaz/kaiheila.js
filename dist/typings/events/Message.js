"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    channel_type;
    type;
    target_id;
    author_id;
    content;
    msg_id;
    msg_timestamp;
    nonce;
    extra;
    constructor() {
        this.channel_type = 'GROUP';
        this.type = 0;
        this.target_id = '';
        this.author_id = '';
        this.content = '';
        this.msg_id = '';
        this.msg_timestamp = 0;
        this.nonce = '';
    }
}
exports.default = Message;
