"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    'me' = { m: 'get', r: '/user/me' };
    'userView' = { m: 'get', r: '/user/view' };
    'userOffline' = { m: 'post', r: '/user/offline' };
    'intimacyIndex' = { m: 'get', r: '/intimacy/index' };
    'intimacyUpdate' = { m: 'get', r: '/intimacy/update' };
    'gateway' = { m: 'get', r: '/gateway/index' };
    'directMessageList' = { m: 'get', r: '/direct-message/list' };
    'directMessageCreate' = { m: 'post', r: '/direct-message/create' };
    'directMessageUpdate' = { m: 'post', r: '/direct-message/update' };
    'directMessageDelete' = { m: 'post', r: '/direct-message/delete' };
    'directMessageListReaction' = {
        m: 'get',
        r: '/direct-message/reaction-list',
    };
    'directMessageAddReaction' = {
        m: 'post',
        r: '/direct-message/add-reaction',
    };
    'directMessageDeleteReaction' = {
        m: 'post',
        r: '/direct-message/delete-reaction',
    };
    'messageList' = { m: 'get', r: '/message/list' };
    'messageCreate' = { m: 'post', r: '/message/create' };
    'messageView' = { m: 'get', r: '/message/view' };
    'messageUpdate' = { m: 'post', r: '/message/update' };
    'messageDelete' = { m: 'post', r: '/message/delete' };
    'messageListReaction' = {
        m: 'get',
        r: '/message/reaction-list',
    };
    'messageAddReaction' = {
        m: 'post',
        r: '/message/add-reaction',
    };
    'messageDeleteReaction' = {
        m: 'post',
        r: '/message/delete-reaction',
    };
    'assetCreate' = { m: 'post', r: '/asset/create' };
    'guilds' = { m: 'get', r: '/guild' };
    'guildList' = { m: 'get', r: '/guild/list' };
    'guild' = { m: 'get', r: '/guild/view' };
    'guildUserList' = { m: 'post', r: '/guild/user-list' };
    'guildNickname' = { m: 'post', r: '/guild/nickname' };
    'guildLeave' = { m: 'post', r: '/guild/leave' };
    'guildKickout' = { m: 'post', r: '/guild/kickout' };
    'guildMuteList' = { m: 'get', r: '/guild-mute/list' };
    'guildMuteCreate' = { m: 'post', r: '/guild-mute/create' };
    'guildMuteDelete' = { m: 'post', r: '/guild-mute/delete' };
    'channel' = { m: 'get', r: '/channel/view' };
    'channelList' = { m: 'get', r: '/channel/list' };
    'channelCreate' = { m: 'post', r: '/channel/create' };
    'channelDelete' = { m: 'post', r: '/channel/delete' };
    'channelMove' = { m: 'post', r: '/channel/move-user' };
    'channelRoleIndex' = { m: 'get', r: '/channel-role/index' };
    'channelRoleCreate' = { m: 'post', r: '/channel-role/create' };
    'channelRoleUpdate' = { m: 'post', r: '/channel-role/update' };
    'channelRoleDelete' = { m: 'post', r: '/channel-role/delete' };
    'roleList' = { m: 'get', r: '/guild-role/list' };
    'roleCreate' = { m: 'post', r: '/guild-role/create' };
    'roleDelete' = { m: 'post', r: '/guild-role/delete' };
    'roleUpdate' = { m: 'post', r: '/guild-role/update' };
    'roleGrant' = { m: 'post', r: '/guild-role/grant' };
    'roleRevoke' = { m: 'post', r: '/guild-role/revoke' };
    'reactionList' = { m: 'get', r: '/message/reaction-list' };
    'reactionCreate' = { m: 'post', r: '/message/add-reaction' };
    'reactionDelete' = { m: 'post', r: '/message/delete-reaction' };
    'userChatList' = { m: 'get', r: '/user-chat/list' };
    'userChatView' = { m: 'get', r: '/user-chat/view' };
    'userChatCreate' = { m: 'post', r: '/user-chat/create' };
    'userChatDelete' = { m: 'post', r: '/user-chat/delete' };
    'guildEmojiList' = { m: 'get', r: '/guild-emoji/list' };
    'guildEmojiCreate' = { m: 'post', r: '/guild-emoji/create' };
    'guildEmojiUpdate' = { m: 'get', r: '/guild-emoji/update' };
    'guildEmojiDelete' = { m: 'get', r: '/guild-emoji/delete' };
    'inviteList' = { m: 'get', r: '/invite/list' };
    'inviteCreate' = { m: 'post', r: '/invite/create' };
    'inviteDelete' = { m: 'post', r: '/invite/delete' };
    'blacklistList' = { m: 'post', r: '/blacklist/list' };
    'blacklistCreate' = { m: 'post', r: '/blacklist/create' };
    'blacklistDelete' = { m: 'post', r: '/blacklist/delete' };
}
exports.default = Routes;
