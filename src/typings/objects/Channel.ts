import User from './User'

export interface PermissionOverwrite {
    role_id: number
    allow: number
    deny: number
}

export interface PermissionUser {
    user: User
    allow: number
    deny: number
}

export default class Channel {
    id: string
    name: string
    user_id: string
    guild_id: string
    is_category: boolean
    parent_id: string
    level: number
    slow_mode: number
    topic: string
    type: number
    limit_amount?: number
    master_id?: string
    permission_overwrites?: PermissionOverwrite[]
    permission_users?: PermissionUser[]
    permission_sync?: number
    constructor() {
        this.id = ''
        this.name = ''
        this.user_id = ''
        this.guild_id = ''
        this.is_category = false
        this.parent_id = ''
        this.level = 0
        this.slow_mode = 0
        this.topic = ''
        this.type = 0
    }
}
