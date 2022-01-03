export interface Body {
    channel_id: string;
    content: string;
    mention: number[];
    mention_all: boolean;
    mention_here: boolean;
    mention_roles: number[];
    updated_at: number;
    msg_id: string;
}
export interface Extra {
    type: string;
    body: Body;
}
export default interface UpdatedMessage {
    channel_type: string;
    type: number;
    target_id: string;
    author_id: string;
    content: string;
    extra: Extra;
    msg_id: string;
    msg_timestamp: number;
    nonce: string;
    verify_token: string;
}
