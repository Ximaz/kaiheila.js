import Client from "../../index";
import API from "../API";

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
  #API: API;
  #routes: API["routes"];
  constructor(client: Client) {
    this.#API = new API(client.token, client.options);
    this.#routes = this.#API.routes;
  }

  async view(userId: string) {
    return (
      await this.#API.execute(this.#routes.intimacyIndex, {
        params: { user_id: userId },
      })
    ).data.data as Intimacy;
  }

  async update(
    userId: string,
    options?: { score?: string; socialInfo?: string; imgId?: string }
  ) {
    return await this.#API.execute(this.#routes.intimacyUpdate, {
      params: {
        user_id: userId,
        score: options?.score,
        social_info: options?.socialInfo,
        img_id: options?.imgId,
      },
    });
  }
}
