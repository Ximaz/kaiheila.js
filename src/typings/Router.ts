export declare interface Route {
    m: string
    r: string
    v?: number
}

export default class Routes {
    'me': Route = { m: 'get', r: '/user/me' }
    'userView': Route = { m: 'get', r: '/user/view' }
    'userOffline': Route = { m: 'post', r: '/user/offline' }
    'intimacyIndex': Route = { m: 'get', r: '/intimacy/index' }
    'intimacyUpdate': Route = { m: 'get', r: '/intimacy/update' }
    'gateway': Route = { m: 'get', r: '/gateway/index' }
    'directMessageList': Route = { m: 'get', r: '/direct-message/list' }
    'directMessageCreate': Route = { m: 'post', r: '/direct-message/create' }
    'directMessageUpdate': Route = { m: 'post', r: '/direct-message/update' }
    'directMessageDelete': Route = { m: 'post', r: '/direct-message/delete' }
    'directMessageListReaction': Route = {
        m: 'get',
        r: '/direct-message/reaction-list',
    }
    'directMessageAddReaction': Route = {
        m: 'post',
        r: '/direct-message/add-reaction',
    }
    'directMessageDeleteReaction': Route = {
        m: 'post',
        r: '/direct-message/delete-reaction',
    }
    'messageList': Route = { m: 'get', r: '/message/list' }
    'messageCreate': Route = { m: 'post', r: '/message/create' }
    'messageView': Route = { m: 'get', r: '/message/view' }
    'messageUpdate': Route = { m: 'post', r: '/message/update' }
    'messageDelete': Route = { m: 'post', r: '/message/delete' }
    'messageListReaction': Route = {
        m: 'get',
        r: '/message/reaction-list',
    }
    'messageAddReaction': Route = {
        m: 'post',
        r: '/message/add-reaction',
    }
    'messageDeleteReaction': Route = {
        m: 'post',
        r: '/message/delete-reaction',
    }
    'assetCreate': Route = { m: 'post', r: '/asset/create' }
    'guilds': Route = { m: 'get', r: '/guild' }
    'guildList': Route = { m: 'get', r: '/guild/list' }
    'guild': Route = { m: 'get', r: '/guild/view' }
    'guildUserList': Route = { m: 'post', r: '/guild/user-list' }
    'guildNickname': Route = { m: 'post', r: '/guild/nickname' }
    'guildLeave': Route = { m: 'post', r: '/guild/leave' }
    'guildKickout': Route = { m: 'post', r: '/guild/kickout' }
    'guildMuteList': Route = { m: 'get', r: '/guild-mute/list' }
    'guildMuteCreate': Route = { m: 'post', r: '/guild-mute/create' }
    'guildMuteDelete': Route = { m: 'post', r: '/guild-mute/delete' }
    'channel': Route = { m: 'get', r: '/channel/view' }
    'channelList': Route = { m: 'get', r: '/channel/list' }
    'channelCreate': Route = { m: 'post', r: '/channel/create' }
    'channelDelete': Route = { m: 'post', r: '/channel/delete' }
    'channelMove': Route = { m: 'post', r: '/channel/move-user' }
    'channelRoleIndex': Route = { m: 'get', r: '/channel-role/index' }
    'channelRoleCreate': Route = { m: 'post', r: '/channel-role/create' }
    'channelRoleUpdate': Route = { m: 'post', r: '/channel-role/update' }
    'channelRoleDelete': Route = { m: 'post', r: '/channel-role/delete' }
    'roleList': Route = { m: 'get', r: '/guild-role/list' }
    'roleCreate': Route = { m: 'post', r: '/guild-role/create' }
    'roleDelete': Route = { m: 'post', r: '/guild-role/delete' }
    'roleUpdate': Route = { m: 'post', r: '/guild-role/update' }
    'roleGrant': Route = { m: 'post', r: '/guild-role/grant' }
    'roleRevoke': Route = { m: 'post', r: '/guild-role/revoke' }
    'reactionList': Route = { m: 'get', r: '/message/reaction-list' }
    'reactionCreate': Route = { m: 'post', r: '/message/add-reaction' }
    'reactionDelete': Route = { m: 'post', r: '/message/delete-reaction' }
    'userChatList': Route = { m: 'get', r: '/user-chat/list' }
    'userChatView': Route = { m: 'get', r: '/user-chat/view' }
    'userChatCreate': Route = { m: 'post', r: '/user-chat/create' }
    'userChatDelete': Route = { m: 'post', r: '/user-chat/delete' }
    'guildEmojiList': Route = { m: 'get', r: '/guild-emoji/list' }
    'guildEmojiCreate': Route = { m: 'post', r: '/guild-emoji/create' }
    'guildEmojiUpdate': Route = { m: 'get', r: '/guild-emoji/update' }
    'guildEmojiDelete': Route = { m: 'get', r: '/guild-emoji/delete' }
    'inviteList': Route = { m: 'get', r: '/invite/list' }
    'inviteCreate': Route = { m: 'post', r: '/invite/create' }
    'inviteDelete': Route = { m: 'post', r: '/invite/delete' }
    'blacklistList': Route = { m: 'post', r: '/blacklist/list' }
    'blacklistCreate': Route = { m: 'post', r: '/blacklist/create' }
    'blacklistDelete': Route = { m: 'post', r: '/blacklist/delete' }
}
