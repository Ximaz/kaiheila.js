/// <reference types="node" />
import { EventEmitter } from 'events';
import { ClientOptions } from './typings/Client';
import { Channel as ChannelEvent, DirectMessage as DirectMessageEvent, Guild as GuildEvent, GuildMember as GuildMemberEvent, GuildRole as GuildRoleEvent, User as UserEvent, Message as MessageEvent } from './typings/events/index';
import { AssetManager, ChannelManager, DirectMessageManager, GuildManager, IntimacyManager, MessageManager, RoleManager, UserChatManager, UserManager } from './handlers/managers/index';
import Card from './handlers/managers/Card';
import User from './typings/objects/User';
declare type GlobalEvents = {
    ready: (sessionId: string) => void;
    disconnected: () => void;
    debug: (e: any) => void;
    message: (message: MessageEvent.default) => void;
    addedChannel: (e: ChannelEvent.AddedChannel) => void;
    updatedChannel: (e: ChannelEvent.UpdatedChannel) => void;
    deletedChannel: (e: ChannelEvent.DeletedChannel) => void;
    deletedMessage: (e: ChannelEvent.DeletedMessage) => void;
    updatedMessage: (e: ChannelEvent.UpdatedMessage) => void;
    pinnedMessage: (e: ChannelEvent.PinnedMessage) => void;
    unpinnedMessage: (e: ChannelEvent.UnpinnedMessage) => void;
    addedReaction: (e: ChannelEvent.AddedReaction) => void;
    deletedReaction: (e: ChannelEvent.DeletedReaction) => void;
    addedPrivateReaction: (e: DirectMessageEvent.AddedPrivateReaction) => void;
    deletedPrivateReaction: (e: DirectMessageEvent.DeletedPrivateReaction) => void;
    updatedPrivateMessage: (e: DirectMessageEvent.UpdatedPrivateMessage) => void;
    deletedPrivateMessage: (e: DirectMessageEvent.DeletedPrivateMessage) => void;
    addedBlockList: (e: GuildEvent.AddedBlackList) => void;
    deletedBlockList: (e: GuildEvent.DeletedBlackList) => void;
    deletedGuild: (e: GuildEvent.DeletedGuild) => void;
    updatedGuild: (e: GuildEvent.UpdatedGuild) => void;
    exitedGuild: (e: GuildMemberEvent.ExitedGuild) => void;
    guildMemberOffline: (e: GuildMemberEvent.GuildMemberOffline) => void;
    guildMemberOnline: (e: GuildMemberEvent.GuildMemberOnline) => void;
    joinedGuild: (e: GuildMemberEvent.JoinedGuild) => void;
    updatedGuildMember: (e: GuildMemberEvent.UpdatedGuildMember) => void;
    addedGuildRole: (e: GuildRoleEvent.AddedGuildRole) => void;
    deletedGuildRole: (e: GuildRoleEvent.DeletedGuildRole) => void;
    updatedGuildRole: (e: GuildRoleEvent.UpdatedGuildRole) => void;
    exitedChannel: (e: UserEvent.ExitedChannel) => void;
    joinedChannel: (e: UserEvent.JoinedChannel) => void;
    messageBtnClick: (e: UserEvent.MessageBtnClick) => void;
    selfExitedGuild: (e: UserEvent.SelfExitedGuild) => void;
    selfJoinedGuild: (e: UserEvent.SelfJoinedGuild) => void;
    updatedUser: (e: UserEvent.UpdatedUser) => void;
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
    me: User;
    managers: Managers;
    constructor(token: string, options?: ClientOptions);
    login(): Promise<void>;
    destroy(): void;
    private getWebsocketURL;
}
import Attachment from './typings/objects/Attachment';
import Channel from './typings/objects/Channel';
import Guild from './typings/objects/Guild';
import Message from './typings/objects/Message';
import Quote from './typings/objects/Quote';
import Role from './typings/objects/Role';
import SelfUser from './typings/objects/SelfUser';
export { Client, Card, Attachment, Channel, Guild, Message, Quote, Role, SelfUser, User, };
