export declare type ClientTokenType = 'BOT' | 'BEARER' | 'USER'


export declare interface ClientOptions {
    packetCompression: boolean
    tokenType: ClientTokenType
    lang: string
}
