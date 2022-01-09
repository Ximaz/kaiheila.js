import { EventEmitter } from 'events'
import API from './handlers/API'
import { ClientOptions } from './typings/Client'
import ClientWebSocket from './handlers/Websocket'
import { EventType } from './typings/handlers/Websocket'
import WebSocket from 'ws'
import {
    Channel as ChannelEvent,
    DirectMessage as DirectMessageEvent,
    Guild as GuildEvent,
    GuildMember as GuildMemberEvent,
    GuildRole as GuildRoleEvent,
    User as UserEvent,
    Message as MessageEvent,
} from './typings/events/index'
import {
    AssetManager,
    ChannelManager,
    DirectMessageManager,
    GuildManager,
    IntimacyManager,
    MessageManager,
    RoleManager,
    UserChatManager,
    UserManager,
} from './handlers/managers/index'
import Card from './handlers/managers/Card'
import User from './typings/objects/User'

type GlobalEvents = {
    // Bot itself :
    ready: (sessionId: string) => void
    disconnected: () => void
    debug: (e: any) => void

    message: (message: MessageEvent.default) => void

    // Channel events :
    addedChannel: (e: ChannelEvent.AddedChannel) => void
    updatedChannel: (e: ChannelEvent.UpdatedChannel) => void
    deletedChannel: (e: ChannelEvent.DeletedChannel) => void
    deletedMessage: (e: ChannelEvent.DeletedMessage) => void
    updatedMessage: (e: ChannelEvent.UpdatedMessage) => void
    pinnedMessage: (e: ChannelEvent.PinnedMessage) => void
    unpinnedMessage: (e: ChannelEvent.UnpinnedMessage) => void
    addedReaction: (e: ChannelEvent.AddedReaction) => void
    deletedReaction: (e: ChannelEvent.DeletedReaction) => void

    // DirectMessage events :
    addedPrivateReaction: (e: DirectMessageEvent.AddedPrivateReaction) => void
    deletedPrivateReaction: (
        e: DirectMessageEvent.DeletedPrivateReaction
    ) => void
    updatedPrivateMessage: (e: DirectMessageEvent.UpdatedPrivateMessage) => void
    deletedPrivateMessage: (e: DirectMessageEvent.DeletedPrivateMessage) => void

    // Guild events :
    addedBlockList: (e: GuildEvent.AddedBlackList) => void
    deletedBlockList: (e: GuildEvent.DeletedBlackList) => void
    deletedGuild: (e: GuildEvent.DeletedGuild) => void
    updatedGuild: (e: GuildEvent.UpdatedGuild) => void

    // GuildMember events :
    exitedGuild: (e: GuildMemberEvent.ExitedGuild) => void
    guildMemberOffline: (e: GuildMemberEvent.GuildMemberOffline) => void
    guildMemberOnline: (e: GuildMemberEvent.GuildMemberOnline) => void
    joinedGuild: (e: GuildMemberEvent.JoinedGuild) => void
    updatedGuildMember: (e: GuildMemberEvent.UpdatedGuildMember) => void

    // GuildRole events :
    addedGuildRole: (e: GuildRoleEvent.AddedGuildRole) => void
    deletedGuildRole: (e: GuildRoleEvent.DeletedGuildRole) => void
    updatedGuildRole: (e: GuildRoleEvent.UpdatedGuildRole) => void

    // User events :
    exitedChannel: (e: UserEvent.ExitedChannel) => void
    joinedChannel: (e: UserEvent.JoinedChannel) => void
    messageBtnClick: (e: UserEvent.MessageBtnClick) => void
    selfExitedGuild: (e: UserEvent.SelfExitedGuild) => void
    selfJoinedGuild: (e: UserEvent.SelfJoinedGuild) => void
    updatedUser: (e: UserEvent.UpdatedUser) => void
}

declare interface Client {
    on<U extends keyof GlobalEvents>(event: U, listener: GlobalEvents[U]): this
    once<U extends keyof GlobalEvents>(
        event: U,
        listener: GlobalEvents[U]
    ): this
    emit<U extends keyof GlobalEvents>(
        event: U,
        ...args: Parameters<GlobalEvents[U]>
    ): boolean
}

declare interface Managers {
    user: UserManager
    userChat: UserChatManager
    directMessage: DirectMessageManager
    asset: AssetManager
    role: RoleManager
    guild: GuildManager
    channel: ChannelManager
    intimacy: IntimacyManager
    message: MessageManager
}

class Client extends EventEmitter {
    // Client
    token
    options
    sessionId: string
    me: User
    #socket: ClientWebSocket | undefined

    // API Handlings
    #API

    // Managers
    managers: Managers
    constructor(
        token: string,
        options: ClientOptions = {
            packetCompression: true,
            tokenType: 'BOT',
            lang: 'en-us',
        }
    ) {
        super()
        if (!token)
            throw new Error(
                'You must supply a valid token. You may get a new token through the Kaiheila Developers page : https://developer.kaiheila.cn/app/index'
            )
        this.token = token
        this.options = options as ClientOptions
        this.#API = new API(token, this.options)
        this.me = new User()
        this.#socket = undefined
        this.managers = {
            user: new UserManager(this),
            userChat: new UserChatManager(this),
            directMessage: new DirectMessageManager(this),
            asset: new AssetManager(this),
            role: new RoleManager(this),
            guild: new GuildManager(this),
            channel: new ChannelManager(this),
            intimacy: new IntimacyManager(this),
            message: new MessageManager(this),
        }
        this.sessionId = ''
    }

    async login() {
        if (this.#socket) {
            clearTimeout(this.#socket.interval)
            this.#socket.reopenSession = true
        }

        const response = await this.getWebsocketURL(),
            { code, data } = response.data

        if (code !== 0)
            throw new Error(
                `An error occured while trying to ${
                    this.#socket?.sessionId ? 'resume' : 'get'
                } a Websocket session.`
            )

        if (this.#socket === undefined) {
            this.#socket = new ClientWebSocket(data.url)
        }

        const onOpen = function (this: Client) {
                if (!this.#socket) return
                this.#socket.sendHeartBeat()
            }.bind(this),
            onMessage = async function (this: Client, event: WebSocket.MessageEvent) {
                if (!this.#socket) return
                const response = this.#socket.parseResponse(event)

                this.emit('debug', response)

                switch (response.s) {
                    case EventType.MESSAGE:
                        if (response.sn && response.sn > this.#socket.sn) {
                            this.#socket.sn = response.sn
                        }

                        const message: any = response.d

                        let type: string = message.extra?.type?.toString()
                        type = type === '1' ? 'message' : type

                        if (!type) return
                        type.match(/_[a-z]{1}/g)?.forEach(function (value) {
                            type = type.replace(
                                value,
                                value.slice(1).toUpperCase()
                            )
                        })

                        this.emit(type as any, message)
                        break

                    case EventType.HANDSHAKE:
                        const { sessionId, session_id } = response.d,
                            trustedSessionId = sessionId || session_id
                        if (!this.#socket.sessionId)
                            this.#socket.sessionId = trustedSessionId
                        this.sessionId = trustedSessionId

                        const meResponse = await this.#API.execute(this.#API.routes.me)
                        Object.assign(this.me, meResponse.data.data)

                        this.emit('ready', trustedSessionId)
                        break

                    case EventType.PING:
                        this.#socket.sendHeartBeat()
                        break

                    case EventType.PONG:
                        // The heartbeat was received.
                        clearTimeout(this.#socket.interval)
                        this.#socket.interval = setTimeout(
                            () => this.#socket?.sendHeartBeat(),
                            (function () {
                                return Math.floor(
                                    Math.random() * (35000 - 25000) + 25000
                                )
                            })()
                        )
                        break

                    case EventType.RESUME_SESSION:
                        // The heartbeat has been received, and it starts to be sent based on 25 seconds.
                        this.#socket.send({
                            s: EventType.RESUME_SESSION,
                            sn: this.#socket.sn,
                        })
                        break

                    // The server asks the client to close it's session to start another one.
                    case EventType.RECONNECT:
                        this.#socket.sn = 0
                        this.#socket.reopenSession = true
                        this.#socket.socket.close()
                        break

                    // Just here to say we handeled it.
                    case EventType.ACK:
                        break

                    default:
                        break
                }
            }.bind(this),
            onClose = function (this: Client) {
                if (this.#socket?.interval) clearTimeout(this.#socket.interval)
                if (this.#socket?.reopenSession) return this.login()
                else return this.destroy()
            }.bind(this)

        this.#socket.socket.on('open', onOpen)
        this.#socket.socket.on('message', onMessage)
        this.#socket.socket.on('close', onClose)
    }

    destroy() {
        if (this.#socket?.reopenSession) this.#socket.reopenSession = false
        this.#socket?.socket.close()
        this.emit('disconnected')
    }

    private async getWebsocketURL() {
        let params: any = { compress: this.options.packetCompression ? 1 : 0 }
        if (this.#socket) {
            const { sessionId, sn } = this.#socket
            if (sessionId !== '' && sn > -1) {
                params = { ...params, resume: '1', sessionId, sn }
            }
        }
        return await this.#API.execute(this.#API.routes.gateway, {
            params,
        })
    }
}

import Attachment from './typings/objects/Attachment'
import Channel from './typings/objects/Channel'
import Guild from './typings/objects/Guild'
import Message from './typings/objects/Message'
import Quote from './typings/objects/Quote'
import Role from './typings/objects/Role'
import SelfUser from './typings/objects/SelfUser'

export {
    Client,
    Card,
    Attachment,
    Channel,
    Guild,
    Message,
    Quote,
    Role,
    SelfUser,
    User,
}
