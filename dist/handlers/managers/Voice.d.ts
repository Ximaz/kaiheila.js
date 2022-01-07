/// <reference types="node" />
import Client from '../../index';
import childProcess from 'child_process';
import ws from 'ws';
export default class VoiceManager {
    #private;
    dispatcher?: childProcess.ChildProcess;
    constructor(client: Client);
    join(channelId: string): Promise<ws>;
}
