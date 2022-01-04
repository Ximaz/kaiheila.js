export interface Attachments {
    type: string;
    name: string;
    url: string;
}
export interface Author {
    identify_num: string;
    avatar: string;
    username: string;
    id: string;
    nickname: string;
    roles: number[];
}
export default interface PictureExtra {
    type: number;
    code: string;
    guild_id: string;
    attachments: Attachments;
    author: Author;
}
