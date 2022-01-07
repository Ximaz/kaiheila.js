import Client from '../../index'
import API from '../API'

declare interface UserChatListItem {
    code: string
    last_read_time: number
    latest_msg_time: number
    unread_count: number
    target_info: {
        id: string
        username: string
        online: boolean
        avatar: string
    }
    is_friend?: false
    is_blocked?: false
    is_target_blocked?: false
}

declare interface UserChatList {
    items: UserChatListItem[]
    meta: {
        page: number
        page_total: number
        page_size: number
        total: number
    }
    sort: {
        id: number
    }
}

export default class UserChatManager {
    #API: API
    #routes: API['routes']
    constructor(client: Client) {
        this.#API = new API(client.token, client.options)
        this.#routes = this.#API.routes
    }

    /**
     * Get a list of private chat chat sessions.
     *
     */
    async list(options?: { page?: number; pageSize?: number }) {
        return (
            await this.#API.execute(this.#routes.userChatList, {
                params: {
                    page: options?.page,
                    page_size: options?.pageSize,
                },
            })
        ).data.data as UserChatList
    }

    /**
     * Get the details of a private message chat session.
     *
     */
    async view(chatCode: string) {
        return (
            await this.#API.execute(this.#routes.userChatView, {
                params: {
                    chat_code: chatCode,
                },
            })
        ).data.data as UserChatListItem
    }

    /**
     * Create a private chat session.
     *
     */
    async create(targetId: string) {
        return (
            await this.#API.execute(this.#routes.userChatCreate, {
                data: {
                    target_id: targetId,
                },
            })
        ).data.data as UserChatListItem
    }

    /**
     * Delete private message chat session.
     *
     */
    async delete(targetId: string) {
        return await this.#API.execute(this.#routes.userChatCreate, {
            data: {
                target_id: targetId,
            },
        })
    }
}
