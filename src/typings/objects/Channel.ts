import User from "./User"


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

export default interface Channel {
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
}