import TextExtra from './Message/textMessage'
import FileExtra from './Message/fileMessage'
import PictureExtra from './Message/pictureMessage'
import VideoExtra from './Message/videoMessage'
import KMarkdownExtra from './Message/kmarkdownMessage'
import CardExtra from './Message/cardMessage'

declare type ChannelType = 'GROUP' | 'PERSON'

export default class Message {
    channel_type: ChannelType
    type: number
    target_id: string
    author_id: string
    content: string
    msg_id: string
    msg_timestamp: number
    nonce: string
    extra?:
        | TextExtra
        | FileExtra
        | PictureExtra
        | VideoExtra
        | KMarkdownExtra
        | CardExtra

    constructor() {
        this.channel_type = 'GROUP'
        this.type = 0
        this.target_id = ''
        this.author_id = ''
        this.content = ''
        this.msg_id = ''
        this.msg_timestamp = 0
        this.nonce = ''
    }
}
