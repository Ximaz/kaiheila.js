"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bits = exports.VoiceManager = exports.CardManager = exports.IntimacyManager = exports.MessageManager = exports.ChannelManager = exports.GuildManager = exports.RoleManager = exports.AssetManager = exports.DirectMessageManager = exports.UserChatManager = exports.UserManager = void 0;
const User_1 = __importDefault(require("./User"));
exports.UserManager = User_1.default;
const UserChat_1 = __importDefault(require("./UserChat"));
exports.UserChatManager = UserChat_1.default;
const DirectMessage_1 = __importDefault(require("./DirectMessage"));
exports.DirectMessageManager = DirectMessage_1.default;
const Asset_1 = __importDefault(require("./Asset"));
exports.AssetManager = Asset_1.default;
const Role_1 = __importDefault(require("./Role"));
exports.RoleManager = Role_1.default;
const Guild_1 = __importDefault(require("./Guild"));
exports.GuildManager = Guild_1.default;
const Channel_1 = __importDefault(require("./Channel"));
exports.ChannelManager = Channel_1.default;
const Message_1 = __importDefault(require("./Message"));
exports.MessageManager = Message_1.default;
const Intimacy_1 = __importDefault(require("./Intimacy"));
exports.IntimacyManager = Intimacy_1.default;
const Card_1 = __importDefault(require("./Card"));
exports.CardManager = Card_1.default;
const Voice_1 = __importDefault(require("./Voice"));
exports.VoiceManager = Voice_1.default;
exports.Bits = {
    ADMINISTRATOR: 1 << 0,
    MANAGE_SERVER: 1 << 1,
    VIEW_MANAGEMENT_LOG: 1 << 2,
    CREATE_SERVER_INVITATION: 1 << 3,
    MANAGE_INVITATION: 1 << 4,
    MANAGE_CHANNEL: 1 << 5,
    KICKOUT_USERS: 1 << 6,
    BAN_USERS: 1 << 7,
    MANAGE_CUSTOM_EMOTICONS: 1 << 8,
    MODIFY_SERVER_NAME: 1 << 9,
    MANAGE_ROLE_PERMISSIONS: 1 << 10,
    VIEW_TEXT_AND_VOICE_CHANNELS: 1 << 11,
    RELEASE_THE_NEWS: 1 << 12,
    MANAGE_MESSAGE: 1 << 13,
    UPLOAD_FILES: 1 << 14,
    VOICE_LINK: 1 << 15,
    MANAGE_VOICE: 1 << 16,
    MENTION_EVERYONE: 1 << 17,
    ADD_REACTION: 1 << 18,
    FOLLOW_ADDED_REACTION: 1 << 19,
    JOIN_VOICE_AS_MUTED: 1 << 20,
    USE_PUSH_TO_TALK: 1 << 21,
    USE_BUTTON_TO_TALK: 1 << 22,
    SPEAK: 1 << 23,
    MUTE_SERVER: 1 << 24,
    CLOSE_SERVER_MICROPHONE: 1 << 25,
    MANAGE_NICKNAMES: 1 << 26,
    PLAY_ACCOMPANIMENT: 1 << 27,
};
