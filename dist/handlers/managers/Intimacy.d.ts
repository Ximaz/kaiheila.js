import Client from '../../index';
declare interface IntimacyImgList {
    id: string;
    url: string;
}
declare interface Intimacy {
    img_url: string;
    social_info: string;
    last_modify: number;
    last_read: number;
    score: number;
    img_list: IntimacyImgList[];
}
export default class IntimacyManager {
    #private;
    constructor(client: Client);
    view(userId: string): Promise<Intimacy>;
    update(userId: string, { score, socialInfo, imgId, }: {
        score?: string;
        socialInfo?: string;
        imgId?: string;
    }): Promise<import("axios").AxiosResponse<any>>;
}
export {};
