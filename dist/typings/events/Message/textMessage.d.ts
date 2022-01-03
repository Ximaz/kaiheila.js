export interface Author {
    identify_num: string;
    avatar: string;
    username: string;
    id: string;
    nickname: string;
    roles: number[];
}
export default interface TextExtra {
    type: number;
    guild_id: string;
    channel_name: string;
    mention: number[];
    mention_all: boolean;
    mention_roles: number[];
    mention_here: boolean;
    code: string;
    author: Author;
}
