/// <reference types="node" />
import { EventEmitter } from 'events';
import { ClientOptions } from './typings/Client';
import { Channel, DirectMessage, Guild, GuildMember, GuildRole, User, Message } from './typings/events/index';
import { AssetManager, ChannelManager, DirectMessageManager, GuildManager, IntimacyManager, MessageManager, RoleManager, UserChatManager, UserManager } from './handlers/managers/index';
import Card from './handlers/managers/Card';
declare type GlobalEvents = {
    ready: (sessionId: string) => void;
    disconnected: () => void;
    debug: (e: any) => void;
    message: (message: Message.Message) => void;
    addedChannel: (e: Channel.AddedChannel) => void;
    updatedChannel: (e: Channel.UpdatedChannel) => void;
    deletedChannel: (e: Channel.DeletedChannel) => void;
    deletedMessage: (e: Channel.DeletedMessage) => void;
    updatedMessage: (e: Channel.UpdatedMessage) => void;
    pinnedMessage: (e: Channel.PinnedMessage) => void;
    unpinnedMessage: (e: Channel.UnpinnedMessage) => void;
    addedReaction: (e: Channel.AddedReaction) => void;
    deletedReaction: (e: Channel.DeletedReaction) => void;
    addedPrivateReaction: (e: DirectMessage.AddedPrivateReaction) => void;
    deletedPrivateReaction: (e: DirectMessage.DeletedPrivateReaction) => void;
    updatedPrivateMessage: (e: DirectMessage.UpdatedPrivateMessage) => void;
    deletedPrivateMessage: (e: DirectMessage.DeletedPrivateMessage) => void;
    addedBlockList: (e: Guild.AddedBlackList) => void;
    deletedBlockList: (e: Guild.DeletedBlackList) => void;
    deletedGuild: (e: Guild.DeletedGuild) => void;
    updatedGuild: (e: Guild.UpdatedGuild) => void;
    exitedGuild: (e: GuildMember.ExitedGuild) => void;
    guildMemberOffline: (e: GuildMember.GuildMemberOffline) => void;
    guildMemberOnline: (e: GuildMember.GuildMemberOnline) => void;
    joinedGuild: (e: GuildMember.JoinedGuild) => void;
    updatedGuildMember: (e: GuildMember.UpdatedGuildMember) => void;
    addedGuildRole: (e: GuildRole.AddedGuildRole) => void;
    deletedGuildRole: (e: GuildRole.DeletedGuildRole) => void;
    updatedGuildRole: (e: GuildRole.UpdatedGuildRole) => void;
    exitedChannel: (e: User.ExitedChannel) => void;
    joinedChannel: (e: User.JoinedChannel) => void;
    messageBtnClick: (e: User.MessageBtnClick) => void;
    selfExitedGuild: (e: User.SelfExitedGuild) => void;
    selfJoinedGuild: (e: User.SelfJoinedGuild) => void;
    updatedUser: (e: User.UpdatedUser) => void;
};
declare interface Client {
    on<U extends keyof GlobalEvents>(event: U, listener: GlobalEvents[U]): this;
    once<U extends keyof GlobalEvents>(event: U, listener: GlobalEvents[U]): this;
    emit<U extends keyof GlobalEvents>(event: U, ...args: Parameters<GlobalEvents[U]>): boolean;
}
declare interface Managers {
    user: UserManager;
    userChat: UserChatManager;
    directMessage: DirectMessageManager;
    asset: AssetManager;
    role: RoleManager;
    guild: GuildManager;
    channel: ChannelManager;
    intimacy: IntimacyManager;
    message: MessageManager;
}
declare class Client extends EventEmitter {
    #private;
    token: string;
    options: ClientOptions;
    sessionId: string;
    managers: Managers;
    constructor(token: string, options?: ClientOptions);
    login(): Promise<void>;
    destroy(): void;
    private getWebsocketURL;
}
export { Client, Card };
