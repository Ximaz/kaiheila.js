"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = __importDefault(require("../API"));
const form_data_1 = __importDefault(require("form-data"));
class GuildEmojiManager {
    #API;
    #routes;
    constructor(client) {
        this.#API = new API_1.default(client.token, client.options);
        this.#routes = this.#API.routes;
    }
    async list(guildId, { page, pageSize }) {
        return (await this.#API.execute(this.#routes.guildEmojiList, {
            params: { guild_id: guildId, page, page_size: pageSize },
        })).data.data;
    }
    async create(name, guildId, emoji, uploadOptions) {
        const form = new form_data_1.default();
        form.append('file', emoji, uploadOptions);
        form.append('guild_id', guildId);
        form.append('name', name);
        return (await this.#API.execute(this.#routes.guildEmojiCreate, {
            data: form,
            headers: {
                'content-type': form.getHeaders()['content-type'],
            },
        })).data.data;
    }
    async update(name, emojiId) {
        await this.#API.execute(this.#routes.guildEmojiUpdate, {
            data: {
                name,
                id: emojiId,
            },
        });
    }
    async delete(emojiId) {
        await this.#API.execute(this.#routes.guildEmojiDelete, {
            data: {
                id: emojiId,
            },
        });
    }
}
class GuildInviteManager {
    #API;
    #routes;
    constructor(client) {
        this.#API = new API_1.default(client.token, client.options);
        this.#routes = this.#API.routes;
    }
    async list(targetId, { targetType, page, pageSize, }) {
        return (await this.#API.execute(this.#routes.inviteList, {
            params: {
                guild_id: targetType === 'GUILD' ? targetId : undefined,
                channel_id: targetType === 'CHANNEL' ? targetId : undefined,
                page,
                page_size: pageSize,
            },
        })).data.data;
    }
    async create(targetId, { duration, settingTimes, targetType, }) {
        return (await this.#API.execute(this.#routes.inviteCreate, {
            data: {
                guild_id: targetType === 'GUILD' ? targetId : undefined,
                channel_id: targetType === 'CHANNEL' ? targetId : undefined,
                duration: duration === 'SEVEN_DAYS'
                    ? 604800
                    : duration === 'ONE_DAY'
                        ? 86400
                        : duration === 'TWELVE_HOURS'
                            ? 43200
                            : duration === 'SIX_HOURS'
                                ? 21600
                                : duration === 'ONE_HOUR'
                                    ? 3600
                                    : duration === 'HALF_HOUR'
                                        ? 1800
                                        : 0,
                setting_times: settingTimes === 'HUNDRED_USES'
                    ? 100
                    : settingTimes === 'FIFTY_USES'
                        ? 50
                        : settingTimes === 'TWENTY_FIVE_USES'
                            ? 25
                            : settingTimes === 'TEN_USES'
                                ? 10
                                : settingTimes === 'FIVE_USES'
                                    ? 5
                                    : settingTimes === 'ONE_USE'
                                        ? 1
                                        : -1,
            },
        })).data.data.url;
    }
    async delete(urlCode, targetId, { targetType, }) {
        await this.#API.execute(this.#routes.inviteDelete, {
            data: {
                guild_id: targetType === 'GUILD' ? targetId : undefined,
                channel_id: targetType === 'CHANNEL' ? targetId : undefined,
                url_code: urlCode,
            },
        });
    }
}
class GuildBlacklistManager {
    #API;
    #routes;
    constructor(client) {
        this.#API = new API_1.default(client.token, client.options);
        this.#routes = this.#API.routes;
    }
    async list(guildId) {
        return (await this.#API.execute(this.#routes.blacklistList, {
            params: { guild_id: guildId },
        })).data.data;
    }
    async create(guildId, userId, { remark, delMsgDays, }) {
        return await this.#API.execute(this.#routes.blacklistCreate, {
            data: {
                guild_id: guildId,
                target_id: userId,
                remark,
                del_msg_days: delMsgDays === 'SEVEN_DAYS'
                    ? 7
                    : delMsgDays === 'ONE_DAY'
                        ? 1
                        : 0,
            },
        });
    }
    async delete(guildId, userId) {
        return await this.#API.execute(this.#routes.blacklistDelete, {
            data: {
                guild_id: guildId,
                user_id: userId,
            },
        });
    }
}
class GuildManager {
    #API;
    #routes;
    emoji;
    invite;
    blacklist;
    constructor(client) {
        this.#API = new API_1.default(client.token, client.options);
        this.#routes = this.#API.routes;
        this.emoji = new GuildEmojiManager(client);
        this.invite = new GuildInviteManager(client);
        this.blacklist = new GuildBlacklistManager(client);
    }
    async list({ page, pageSize, sort, }) {
        return (await this.#API.execute(this.#routes.guildList, {
            params: { page, pageSize, sort },
        })).data.data;
    }
    async view(guildId) {
        return (await this.#API.execute(this.#routes.guild, {
            params: { guild_id: guildId },
        })).data.data;
    }
    async userList(guildId, { channelId, search, roleId, mobileVerified, activeTime, joinedAt, page, pageSize, filterUserId, }) {
        return (await this.#API.execute(this.#routes.guildUserList, {
            params: {
                guild_id: guildId,
                channel_id: channelId,
                search: search,
                role_id: roleId,
                mobile_verified: mobileVerified,
                active_time: activeTime,
                joined_at: joinedAt,
                page: page,
                page_size: pageSize,
                filter_user_id: filterUserId,
            },
        })).data.data;
    }
    async setNickname(guildId, userId, nickname) {
        if (nickname.length < 2 || nickname.length > 64)
            throw new Error('The nickname must be from 2 to 64 characters long.');
        return await this.#API.execute(this.#routes.guildNickname, {
            data: {
                guild_id: guildId,
                user_id: userId,
                nickname,
            },
        });
    }
    async leave(guildId) {
        return await this.#API.execute(this.#routes.guildLeave, {
            data: { guild_id: guildId },
        });
    }
    async kick(guildId, targetId) {
        return await this.#API.execute(this.#routes.guildKickout, {
            data: { guild_id: guildId, target_id: targetId },
        });
    }
    async getMuteAndDeaf(guildId, returnType = 'detail') {
        return (await this.#API.execute(this.#routes.guildMuteList, {
            params: { guild_id: guildId, return_type: returnType },
        })).data.data;
    }
    async addMuteOrDeaf(guildId, userId, type) {
        return await this.#API.execute(this.#routes.guildMuteCreate, {
            data: { guild_id: guildId, user_id: userId, type },
        });
    }
    async removeMuteOrDeaf(guildId, userId, type) {
        return await this.#API.execute(this.#routes.guildMuteDelete, {
            data: { guild_id: guildId, user_id: userId, type },
        });
    }
    async mute(guildId, userId) {
        return await this.addMuteOrDeaf(guildId, userId, 1);
    }
    async deaf(guildId, userId) {
        return await this.addMuteOrDeaf(guildId, userId, 2);
    }
    async unmute(guildId, userId) {
        return await this.removeMuteOrDeaf(guildId, userId, 1);
    }
    async undeaf(guildId, userId) {
        return await this.removeMuteOrDeaf(guildId, userId, 2);
    }
}
exports.default = GuildManager;
