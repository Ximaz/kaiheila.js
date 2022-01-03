"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    constructor() {
        this['me'] = { m: 'get', r: '/user/me' };
        this['userView'] = { m: 'get', r: '/user/view' };
        this['userOffline'] = { m: 'post', r: '/user/offline' };
        this['intimacyIndex'] = { m: 'get', r: '/intimacy/index' };
        this['intimacyUpdate'] = { m: 'get', r: '/intimacy/update' };
        this['gateway'] = { m: 'get', r: '/gateway/index' };
        this['directMessageList'] = { m: 'get', r: '/direct-message/list' };
        this['directMessageCreate'] = { m: 'post', r: '/direct-message/create' };
        this['directMessageUpdate'] = { m: 'post', r: '/direct-message/update' };
        this['directMessageDelete'] = { m: 'post', r: '/direct-message/delete' };
        this['directMessageListReaction'] = {
            m: 'get',
            r: '/direct-message/reaction-list',
        };
        this['directMessageAddReaction'] = {
            m: 'post',
            r: '/direct-message/add-reaction',
        };
        this['directMessageDeleteReaction'] = {
            m: 'post',
            r: '/direct-message/delete-reaction',
        };
        this['messageList'] = { m: 'get', r: '/message/list' };
        this['messageCreate'] = { m: 'post', r: '/message/create' };
        this['messageView'] = { m: 'get', r: '/message/view' };
        this['messageUpdate'] = { m: 'post', r: '/message/update' };
        this['messageDelete'] = { m: 'post', r: '/message/delete' };
        this['messageListReaction'] = {
            m: 'get',
            r: '/message/reaction-list',
        };
        this['messageAddReaction'] = {
            m: 'post',
            r: '/message/add-reaction',
        };
        this['messageDeleteReaction'] = {
            m: 'post',
            r: '/message/delete-reaction',
        };
        this['assetCreate'] = { m: 'post', r: '/asset/create' };
        this['guilds'] = { m: 'get', r: '/guild' };
        this['guildList'] = { m: 'get', r: '/guild/list' };
        this['guild'] = { m: 'get', r: '/guild/view' };
        this['guildUserList'] = { m: 'post', r: '/guild/user-list' };
        this['guildNickname'] = { m: 'post', r: '/guild/nickname' };
        this['guildLeave'] = { m: 'post', r: '/guild/leave' };
        this['guildKickout'] = { m: 'post', r: '/guild/kickout' };
        this['guildMuteList'] = { m: 'get', r: '/guild-mute/list' };
        this['guildMuteCreate'] = { m: 'post', r: '/guild-mute/create' };
        this['guildMuteDelete'] = { m: 'post', r: '/guild-mute/delete' };
        this['channel'] = { m: 'get', r: '/channel/view' };
        this['channelList'] = { m: 'get', r: '/channel/list' };
        this['channelCreate'] = { m: 'post', r: '/channel/create' };
        this['channelDelete'] = { m: 'post', r: '/channel/delete' };
        this['channelMove'] = { m: 'post', r: '/channel/move-user' };
        this['channelRoleIndex'] = { m: 'get', r: '/channel-role/index' };
        this['channelRoleCreate'] = { m: 'post', r: '/channel-role/create' };
        this['channelRoleUpdate'] = { m: 'post', r: '/channel-role/update' };
        this['channelRoleDelete'] = { m: 'post', r: '/channel-role/delete' };
        this['roleList'] = { m: 'get', r: '/guild-role/list' };
        this['roleCreate'] = { m: 'post', r: '/guild-role/create' };
        this['roleDelete'] = { m: 'post', r: '/guild-role/delete' };
        this['roleUpdate'] = { m: 'post', r: '/guild-role/update' };
        this['roleGrant'] = { m: 'post', r: '/guild-role/grant' };
        this['roleRevoke'] = { m: 'post', r: '/guild-role/revoke' };
        this['reactionList'] = { m: 'get', r: '/message/reaction-list' };
        this['reactionCreate'] = { m: 'post', r: '/message/add-reaction' };
        this['reactionDelete'] = { m: 'post', r: '/message/delete-reaction' };
        this['userChatList'] = { m: 'get', r: '/user-chat/list' };
        this['userChatView'] = { m: 'get', r: '/user-chat/view' };
        this['userChatCreate'] = { m: 'post', r: '/user-chat/create' };
        this['userChatDelete'] = { m: 'post', r: '/user-chat/delete' };
        this['guildEmojiList'] = { m: 'get', r: '/guild-emoji/list' };
        this['guildEmojiCreate'] = { m: 'post', r: '/guild-emoji/create' };
        this['guildEmojiUpdate'] = { m: 'get', r: '/guild-emoji/update' };
        this['guildEmojiDelete'] = { m: 'get', r: '/guild-emoji/delete' };
        this['inviteList'] = { m: 'get', r: '/invite/list' };
        this['inviteCreate'] = { m: 'post', r: '/invite/create' };
        this['inviteDelete'] = { m: 'post', r: '/invite/delete' };
        this['blacklistList'] = { m: 'post', r: '/blacklist/list' };
        this['blacklistCreate'] = { m: 'post', r: '/blacklist/create' };
        this['blacklistDelete'] = { m: 'post', r: '/blacklist/delete' };
    }
}
exports.default = Routes;
