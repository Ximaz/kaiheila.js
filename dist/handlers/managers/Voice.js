"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const ffmpeg = ffmpeg_static_1.default.replace(/(.+)(?:\/.+$)/, '$1'), platform = process.env.npm_config_platform || os_1.default.platform(), arch = process.env.npm_config_arch || os_1.default.arch(), voicePath = path_1.default.join(__dirname, `../../../bin/voice_${platform}_${arch}${platform === 'win32' ? '.exe' : ''}`);
class VoiceManager {
    constructor(client) {
        throw new Error('Voice functions have not been implemented yet.');
    }
}
exports.default = VoiceManager;
