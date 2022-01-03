import { AxiosResponse } from 'axios';
import { ClientTokenType } from '../typings/Client';
import Routes, { Route } from '../typings/Router';
export declare interface ApiHandlerOptions {
    tokenType: ClientTokenType;
    lang: string;
}
declare class ApiHandler {
    #private;
    routes: Routes;
    constructor(token: string, { tokenType, lang }: ApiHandlerOptions);
    private getRoute;
    execute(route: Route, options?: {
        headers?: any;
        data?: any;
        params?: any;
    }): Promise<AxiosResponse>;
    private handleRateLimit;
}
export default ApiHandler;
