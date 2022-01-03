export interface Attachments {
    type: string;
    url: string;
    name: string;
    file_type: string;
    size: number;
}
export interface Author {
    identify_num: string;
    avatar: string;
    username: string;
    id: string;
    nickname: string;
    roles: number[];
}
export default interface FileExtra {
    type: number;
    guild_id: string;
    code: string;
    attachments: Attachments;
    author: Author;
}
