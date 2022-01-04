import TextExtra from './Message/textMessage';
import FileExtra from './Message/fileMessage';
import PictureExtra from './Message/pictureMessage';
import VideoExtra from './Message/videoMessage';
import KMarkdownExtra from './Message/kmarkdownMessage';
import CardExtra from './Message/cardMessage';
declare type ChannelType = 'GROUP' | 'PERSON';
export declare interface Message {
    channel_type: ChannelType;
    type: number;
    target_id: string;
    author_id: string;
    content: string;
    msg_id: string;
    msg_timestamp: number;
    nonce: string;
    extra: TextExtra | FileExtra | PictureExtra | VideoExtra | KMarkdownExtra | CardExtra;
}
export {};
