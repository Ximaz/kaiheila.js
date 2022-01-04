/// <reference types="node" />
import ws from 'ws';
import { DefaultResponse } from '../typings/handlers/Websocket';
export default class ClientWebSocket {
    #private;
    socket: ws;
    sn: number;
    interval: NodeJS.Timeout;
    sessionId: string;
    reopenSession: boolean;
    constructor(socketURL: string);
    send(body: any): void;
    sendHeartBeat(): void;
    parseResponse(event: any): DefaultResponse;
}
