"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = __importDefault(require("../API"));
class IntimacyManager {
    #API;
    #routes;
    constructor(client) {
        this.#API = new API_1.default(client.token, client.options);
        this.#routes = this.#API.routes;
    }
    async view(userId) {
        return (await this.#API.execute(this.#routes.intimacyIndex, {
            params: { user_id: userId },
        })).data.data;
    }
    async update(userId, { score, socialInfo, imgId, }) {
        return await this.#API.execute(this.#routes.intimacyUpdate, {
            params: {
                user_id: userId,
                score,
                social_info: socialInfo,
                img_id: imgId,
            },
        });
    }
}
exports.default = IntimacyManager;
