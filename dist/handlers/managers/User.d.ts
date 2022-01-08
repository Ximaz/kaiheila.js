import { Client } from "../../index";
import SelfUser from "../../typings/objects/SelfUser";
import User from "../../typings/objects/User";
export default class UserManager {
    #private;
    constructor(client: Client);
    me(): Promise<SelfUser>;
    view(userId: string, options?: {
        guildId?: string;
    }): Promise<User>;
    offline(): Promise<import("axios").AxiosResponse<any>>;
}
