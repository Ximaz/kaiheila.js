import { EventEmitter } from 'events'
import API from './handlers/API'
import { ClientOptions } from './typings/Client'
import ClientWebSocket from './handlers/Websocket'
import { EventType } from './typings/handlers/Websocket'
import WebSocket from 'ws'
import {
    Channel,
    DirectMessage,
    Guild,
    GuildMember,
    GuildRole,
    User,
    Message,
} from './typings/events/index'
import * as Manager from './handlers/managers/index'
import Card from './handlers/managers/Card'

type GlobalEvents = {
    // Bot itself :
    ready: (sessionId: string) => void
    disconnected: () => void
    debug: (e: any) => void

    message: (message: Message.Message) => void

    // Channel events :
    addedChannel: (e: Channel.AddedChannel) => void
    updatedChannel: (e: Channel.UpdatedChannel) => void
    deletedChannel: (e: Channel.DeletedChannel) => void
    deletedMessage: (e: Channel.DeletedMessage) => void
    updatedMessage: (e: Channel.UpdatedMessage) => void
    pinnedMessage: (e: Channel.PinnedMessage) => void
    unpinnedMessage: (e: Channel.UnpinnedMessage) => void
    addedReaction: (e: Channel.AddedReaction) => void
    deletedReaction: (e: Channel.DeletedReaction) => void

    // DirectMessage events :
    addedPrivateReaction: (e: DirectMessage.AddedPrivateReaction) => void
    deletedPrivateReaction: (e: DirectMessage.DeletedPrivateReaction) => void
    updatedPrivateMessage: (e: DirectMessage.UpdatedPrivateMessage) => void
    deletedPrivateMessage: (e: DirectMessage.DeletedPrivateMessage) => void

    // Guild events :
    addedBlockList: (e: Guild.AddedBlackList) => void
    deletedBlockList: (e: Guild.DeletedBlackList) => void
    deletedGuild: (e: Guild.DeletedGuild) => void
    updatedGuild: (e: Guild.UpdatedGuild) => void

    // GuildMember events :
    exitedGuild: (e: GuildMember.ExitedGuild) => void
    guildMemberOffline: (e: GuildMember.GuildMemberOffline) => void
    guildMemberOnline: (e: GuildMember.GuildMemberOnline) => void
    joinedGuild: (e: GuildMember.JoinedGuild) => void
    updatedGuildMember: (e: GuildMember.UpdatedGuildMember) => void

    // GuildRole events :
    addedGuildRole: (e: GuildRole.AddedGuildRole) => void
    deletedGuildRole: (e: GuildRole.DeletedGuildRole) => void
    updatedGuildRole: (e: GuildRole.UpdatedGuildRole) => void

    // User events :
    exitedChannel: (e: User.ExitedChannel) => void
    joinedChannel: (e: User.JoinedChannel) => void
    messageBtnClick: (e: User.MessageBtnClick) => void
    selfExitedGuild: (e: User.SelfExitedGuild) => void
    selfJoinedGuild: (e: User.SelfJoinedGuild) => void
    updatedUser: (e: User.UpdatedUser) => void
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
    user: Manager.UserManager
    userChat: Manager.UserChatManager
    directMessage: Manager.DirectMessageManager
    asset: Manager.AssetManager
    role: Manager.RoleManager
    guild: Manager.GuildManager
    channel: Manager.ChannelManager
    intimacy: Manager.IntimacyManager
    message: Manager.MessageManager
    voice: Manager.VoiceManager
}

class Client extends EventEmitter {
    // Client
    token
    options
    sessionId: string
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
        this.#socket = undefined
        this.managers = {
            user: new Manager.UserManager(this),
            userChat: new Manager.UserChatManager(this),
            directMessage: new Manager.DirectMessageManager(this),
            asset: new Manager.AssetManager(this),
            role: new Manager.RoleManager(this),
            guild: new Manager.GuildManager(this),
            channel: new Manager.ChannelManager(this),
            intimacy: new Manager.IntimacyManager(this),
            message: new Manager.MessageManager(this),
            voice: new Manager.VoiceManager(this)
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
            onMessage = function (this: Client, event: WebSocket.MessageEvent) {
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

export { Client, Card }

export default Client
