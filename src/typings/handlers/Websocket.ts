export declare interface DefaultResponse {
    s: number
    d?: any
    sn?: number
}

export const ErrorCodes = {
    MISSING_PARAMS: 40100,
    INVALID_TOKEN: 40101,
    TOKEN_VERIFICATION_FAILED: 40102,
    TOKEN_EXPIRED: 40103,
}

export const ReconnectionCodes = {
    RESUME_SESSION_FAILED: 40106,
    SESSION_EXPIRED: 40107,
    INVALID_OR_UNDEFINED_SN: 40108,
}

export const EventType = {
    MESSAGE: 0,
    HANDSHAKE: 1,
    PING: 2,
    PONG: 3,
    RESUME_SESSION: 4,
    RECONNECT: 5,
    ACK: 6,
}

export declare interface Options {
    maxRetry: number
    retry: boolean
}
