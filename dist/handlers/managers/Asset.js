"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = __importDefault(require("../API"));
const form_data_1 = __importDefault(require("form-data"));
class AssetManager {
    #API;
    #routes;
    constructor(client) {
        this.#API = new API_1.default(client.token, client.options);
        this.#routes = this.#API.routes;
    }
    async create(file, options) {
        const form = new form_data_1.default();
        form.append('file', file, options);
        return (await this.#API.execute(this.#routes.assetCreate, {
            data: form,
            headers: {
                'content-type': form.getHeaders()['content-type'],
            },
        })).data.data.url;
    }
}
exports.default = AssetManager;
