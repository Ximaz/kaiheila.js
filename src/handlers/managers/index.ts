import UserManager from './User'
import UserChatManager from './UserChat'
import DirectMessageManager from './DirectMessage'
import AssetManager from './Asset'
import RoleManager from './Role'
import GuildManager from './Guild'
import ChannelManager from './Channel'
import MessageManager from './Message'
import IntimacyManager from './Intimacy'
import CardManager from './Card'

export {
    UserManager,
    UserChatManager,
    DirectMessageManager,
    AssetManager,
    RoleManager,
    GuildManager,
    ChannelManager,
    MessageManager,
    IntimacyManager,
    CardManager
}

export type BitFields =
    | 'ADMINISTRATOR'
    | 'MANAGE_SERVER'
    | 'VIEW_MANAGEMENT_LOG'
    | 'CREATE_SERVER_INVITATION'
    | 'MANAGE_INVITATION'
    | 'MANAGE_CHANNEL'
    | 'KICKOUT_USERS'
    | 'BAN_USERS'
    | 'MANAGE_CUSTOM_EMOTICONS'
    | 'MODIFY_SERVER_NAME'
    | 'MANAGE_ROLE_PERMISSIONS'
    | 'VIEW_TEXT_AND_VOICE_CHANNELS'
    | 'RELEASE_THE_NEWS'
    | 'MANAGE_MESSAGE'
    | 'UPLOAD_FILES'
    | 'VOICE_LINK'
    | 'MANAGE_VOICE'
    | 'MENTION_EVERYONE'
    | 'ADD_REACTION'
    | 'FOLLOW_ADDED_REACTION'
    | 'JOIN_VOICE_AS_MUTED'
    | 'USE_PUSH_TO_TALK'
    | 'USE_BUTTON_TO_TALK'
    | 'SPEAK'
    | 'MUTE_SERVER'
    | 'CLOSE_SERVER_MICROPHONE'
    | 'MANAGE_NICKNAMES'
    | 'PLAY_ACCOMPANIMENT'

export const Bits = {
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
}
