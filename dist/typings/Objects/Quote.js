"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
class Quote {
    id;
    type;
    content;
    create_at;
    author;
    constructor(client) {
        this.id = '';
        this.type = 0;
        this.content = '';
        this.create_at = 0;
        this.author = new User_1.default();
    }
}
exports.default = Quote;
