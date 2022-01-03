import Role from "./Role";
import Channel from "./Channel";

export default interface Guild {
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
}
