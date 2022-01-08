/// <reference types="node" />
import { Client } from '../../index';
import FormData, { Stream } from 'form-data';
export default class AssetManager {
    #private;
    constructor(client: Client);
    create(file: Buffer | Stream, options?: FormData.AppendOptions): Promise<string>;
}
