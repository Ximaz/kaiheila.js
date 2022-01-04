export interface TagInfo {
    color: string;
    text: string;
}
export interface Author {
    id: string;
    username: string;
    identify_num: string;
    online: boolean;
    os: string;
    status: number;
    avatar: string;
    tag_info: TagInfo;
    nickname: string;
    roles: number[];
}
export default interface CardExtra {
    type: number;
    guild_id: string;
    channel_name: string;
    mention: number[];
    mention_all: boolean;
    mention_roles: number[];
    mention_here: boolean;
    nav_channels: any[];
    code: string;
    author: Author;
}
