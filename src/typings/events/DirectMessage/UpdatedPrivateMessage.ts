export interface Body {
    author_id: string
    target_id: string
    msg_id: string
    content: string
    updated_at: number
    chat_code: string
}

export interface Extra {
    type: string
    body: Body
}

export default interface UpdatedPrivateMessage {
    channel_type: string
    type: number
    target_id: string
    author_id: string
    content: string
    extra: Extra
    msg_id: string
    msg_timestamp: number
    nonce: string
    verify_token: string
}
