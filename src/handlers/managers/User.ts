import Client from "../../index";
import SelfUser from "../../typings/objects/SelfUser";
import User from "../../typings/objects/User";
import API from "../API";

export default class UserManager {
  #API: API;
  #routes: API["routes"];
  constructor(client: Client) {
    this.#API = new API(client.token, client.options);
    this.#routes = this.#API.routes;
  }

  /**
   * Get the information of the currently logged in user.
   */
  async me() {
    return (await this.#API.execute(this.#routes.me)).data.data as SelfUser;
  }

  /**
   * Get the information of the specified user.
   * You may target a guild.
   */
  async view(userId: string, options?: { guildId?: string }) {
    return (
      await this.#API.execute(this.#routes.userView, {
        params: { user_id: userId, guild_id: options?.guildId },
      })
    ).data.data as User;
  }

  /**
   * Set the bot offline.
   */
  async offline() {
    return await this.#API.execute(this.#routes.userOffline);
  }
}
