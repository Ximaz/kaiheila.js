export declare interface DefaultResponse {
    s: number;
    d?: any;
    sn?: number;
}
export declare const ErrorCodes: {
    MISSING_PARAMS: number;
    INVALID_TOKEN: number;
    TOKEN_VERIFICATION_FAILED: number;
    TOKEN_EXPIRED: number;
};
export declare const ReconnectionCodes: {
    RESUME_SESSION_FAILED: number;
    SESSION_EXPIRED: number;
    INVALID_OR_UNDEFINED_SN: number;
};
export declare const EventType: {
    MESSAGE: number;
    HANDSHAKE: number;
    PING: number;
    PONG: number;
    RESUME_SESSION: number;
    RECONNECT: number;
    ACK: number;
};
export declare interface Options {
    maxRetry: number;
    retry: boolean;
}
