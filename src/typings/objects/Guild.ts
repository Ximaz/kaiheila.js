import Role from "./Role";
import Channel from "./Channel";

export default class Guild {
    id: string
    name: string
    topic: string
    master_id: string
    icon: string
    notify_type: number
    region: string
    enable_open: boolean
    open_id: string
    default_channel_id: string
    welcome_channel_id: string
    roles: Role[]
    channels: Channel[]
    constructor() {
        this.id = ''
        this.name = ''
        this.topic = ''
        this.master_id = ''
        this.icon = ''
        this.notify_type = 0
        this.region = ''
        this.enable_open = false
        this.open_id = ''
        this.default_channel_id = ''
        this.welcome_channel_id = ''
        this.roles = []
        this.channels = []
    }
}
