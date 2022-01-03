export interface TagInfo {
    color: string;
    text: string;
}
export interface Kmarkdown {
    raw_content: string;
    mention_part: any[];
    mention_role_part: any[];
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
export default interface KMarkdownExtra {
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
    kmarkdown: Kmarkdown;
}
