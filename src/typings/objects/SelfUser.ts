export default class SelfUser {
    id: string
    username: string
    identify_num: string
    online: boolean
    status: number
    avatar: string
    bot: boolean
    mobile_verified: boolean
    client_id: string
    mobile_prefix: string
    mobile: string
    invited_count: number
    constructor() {
        this.id = ''
        this.username = ''
        this.identify_num = ''
        this.online = false
        this.status = 0
        this.avatar = ''
        this.bot = false
        this.mobile_verified = false
        this.client_id = ''
        this.mobile_prefix = ''
        this.mobile = ''
        this.invited_count = 0
    }
}
