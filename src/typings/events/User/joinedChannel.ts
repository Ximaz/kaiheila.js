export interface Body {
    user_id: string
    channel_id: string
    joined_at: number
}

export interface Extra {
    type: string
    body: Body
}

export default interface JoinedChannel {
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
