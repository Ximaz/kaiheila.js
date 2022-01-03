import Client from '../../index'
import API from '../API'
import Card from './Card'

declare interface MessageEmbed {
    type: string
    url: string
    origin_url: string
    av_no: string
    iframe_path: string
    duration: number
    title: string
    pic: string
}

declare interface MessageAttachment {
    type: string
    url: string
    name: string
    duration?: string
    size?: string
    width?: string
    height?: string
}

declare interface MessageReactionUser {
    id: string
    username: string
    identify_num: string
    online: boolean
    status: number
    avatar: string
    bot: boolean
    tag_info: {
        color: string
        text: string
    }
    nickname: string
    reaction_time: number
}

declare interface MessageReaction {
    emoji: {
        id: string
        name: string
    }
    count: number
    me: boolean
}

declare interface MessageAuthor {
    id: string
    username: string
    online: boolean
    avatar: string
}

declare interface MessageQuote {
    id: string
    type: number
    content: string
    create_at: number
    author: {
        id: string
        username: string
        identify_num: string
        online: true
        os: string
        status: number
        avatar: string
        vip_avatar: string
        nickname: string
        roles: number[]
        is_vip: boolean
        bot: boolean
        mobile_verified: boolean
        joined_at: number
        active_time: number
    }
}

declare interface MessageMentionRole {
    role_id: number
    name: string
    color: number
    position: number
    hoist: number
    mentionable: number
    permissions: number
}

declare interface MessageMention {
    id: string
    username: string
    full_name: string
    avatar: string
}

declare interface Message {
    id: string
    type: number
    content: string
    mention: string[]
    mention_all: boolean
    mention_roles: number[]
    mention_here: boolean
    embeds?: MessageEmbed[]
    attachments?: MessageAttachment
    create_at: number
    updated_at: number
    reactions?: MessageReaction[]
    author: MessageAuthor
    image_name?: string
    read_status: boolean
    quote?: MessageQuote
    mention_info: {
        mention_part: MessageMention[]
        mention_role_part: MessageMentionRole[]
    }
}

declare interface MessageList {
    items: Message[]
}

export default class MessageManager {
    #API: API
    #routes: API['routes']
    #client: Client
    constructor(client: Client) {
        this.#client = client
        this.#API = new API(client.token, client.options)
        this.#routes = this.#API.routes
    }

    /**
     * Get the list of channel chat messages.
     *
     */
    async list(
        targetId: string,
        {
            msgId,
            pin,
            flag,
            pageSize,
        }: {
            msgId: string
            pin: number
            flag: 'before' | 'around' | 'after'
            pageSize: number
        }
    ) {
        return (
            await this.#API.execute(this.#routes.messageList, {
                params: {
                    target_id: targetId,
                    msg_id: msgId,
                    pin,
                    flag,
                    page_size: pageSize,
                },
            })
        ).data.data as MessageList
    }

    /**
     * Get details of channel chat messages.
     *
     */
    async view(msgId: string) {
        return (
            await this.#API.execute(this.#routes.messageView, {
                params: {
                    msg_id: msgId,
                },
            })
        ).data.data as Message
    }

    /**
     * Send channel chat message.
     *
     */
    async create(
        targetId: string,
        content: string | Card[] | Card,
        options?: {
            type?: 'KMARDOWN' | 'CARD'
            quote?: string
            nonce?: string
            tempTargetId?: string
        }
    ): Promise<{
        msg_id: string
        msg_timestamp: number
        nonce: string
    }> {
        if (content instanceof Card || content instanceof Array) {
            if (!options) options = {}
            options.type = 'CARD'

            if (!Array.isArray(content))
                content = [new Card(this.#client, content)]
            else
                for (let i = 0; i < content.length; i++) {
                    content[i] = new Card(this.#client, content[i])
                }
            // for (let i = 0; i < content.length; i++) {
            //     const c: Card = content[i]
            //     for (const a of c.attachments) {
            //         const { attachmentName, upload } = a,
            //             { file, options } = upload,
            //             attachmentURL =
            //                 await this.#client.managers.asset.create(
            //                     file,
            //                     options
            //                 )
            //         c.addPictureContainer([
            //             {
            //                 type: 'image',
            //                 src: attachmentURL,
            //                 alt: attachmentName,
            //                 circle: false,
            //                 size: 'lg',
            //             },
            //         ])
            //     }
            // }
            content = JSON.stringify(content)
        }

        return (
            await this.#API.execute(this.#routes.messageCreate, {
                data: {
                    target_id: targetId,
                    content,
                    type:
                        typeof content !== 'string' || options?.type === 'CARD'
                            ? 10
                            : options?.type === 'KMARDOWN'
                            ? 9
                            : 1,
                    nonce: options?.nonce,
                    quote: options?.quote,
                    temp_target_id: options?.tempTargetId,
                },
            })
        ).data.data
    }

    /**
     * Update channel chat message.
     *
     */
    async update(
        msgId: string,
        content: string,
        {
            quote,
            tempTargetId,
        }: {
            quote?: string
            tempTargetId?: string
        }
    ) {
        await this.#API.execute(this.#routes.messageUpdate, {
            data: {
                msg_id: msgId,
                content,
                quote,
                temp_target_id: tempTargetId,
            },
        })
    }

    /**
     * Delete channel chat message.
     *
     */
    async delete(msgId: string) {
        await this.#API.execute(this.#routes.messageDelete, {
            data: {
                msg_id: msgId,
            },
        })
    }

    /**
     * Get a list of users who responded to a channel message.
     *
     */
    async listReaction(msgId: string, emoji: string) {
        return (
            await this.#API.execute(this.#routes.messageListReaction, {
                params: {
                    msg_id: msgId,
                    emoji: encodeURIComponent(emoji),
                },
            })
        ).data.data as MessageReactionUser[]
    }

    /**
     * Add a response to a message.
     *
     */
    async addReaction(msgId: string, emoji: string) {
        await this.#API.execute(this.#routes.messageAddReaction, {
            data: {
                msg_id: msgId,
                emoji,
            },
        })
    }

    /**
     * Delete a response to the message.
     *
     */
    async deleteReaction(
        msgId: string,
        emoji: string,
        { userId }: { userId?: string }
    ) {
        await this.#API.execute(this.#routes.messageDeleteReaction, {
            data: {
                msg_id: msgId,
                emoji,
                user_id: userId,
            },
        })
    }
}
