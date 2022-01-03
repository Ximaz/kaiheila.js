import { User } from './typings/objects';
export declare class Extra {
    'type': number;
    'guild_id': string;
    'channel_name': string;
    'mention': number[];
    'mention_all': boolean;
    'mention_roles': number[];
    'mention_here': boolean;
    'author': User;
}
export declare class ExtraSystem {
    'type': string;
    'body': any;
}
export default class EventResponse {
    'channel_type': string;
    'type': number;
    'target_id': string;
    'author_id': string;
    'content': string;
    'msg_id': string;
    'msg_timestamp': number;
    'nonce': string;
    'extra': any;
}
