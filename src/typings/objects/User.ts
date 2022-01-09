import ApiHandler from '../../handlers/API'
import { Client } from '../../index'

export default class User {
    id: string
    username: string
    identify_num: string
    online: boolean
    avatar: string
    vip_avatar: string
    bot: boolean
    status: number
    nickname: string
    mobile_verified?: boolean
    roles?: number[]
    os?: string
    joined_at?: number
    active_time?: number
    constructor() {
        this.id = ''
        this.username = ''
        this.identify_num = ''
        this.online = false
        this.avatar = ''
        this.vip_avatar = ''
        this.bot = false
        this.status = 0
        this.mobile_verified = false
        this.nickname = ''
    }
}
