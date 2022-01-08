import { Client } from "../../index";
import API from "../API";

declare interface DirectMessageItem {
  id: string;
  type: number;
  content: string;
  embeds: [];
  attachments: [];
  create_at: number;
  updated_at: number;
  reactions: [];
  author_id: string;
  image_name: string;
  read_status: boolean;
  quote: null;
  mention_info: null;
}

declare interface DirectMessageList {
  items: DirectMessageItem[];
  meta: {
    page: number;
    page_total: number;
    page_size: number;
    total: number;
  };
  sort: {
    id: number;
  };
}

declare interface ReactionUser {
  id: string;
  username: string;
  identify_num: string;
  online: boolean;
  status: number;
  avatar: string;
  vip_avatar: string;
  bot: boolean;
  nickname: string;
  reaction_time: number;
}

export default class DirectMessage {
  #API: API;
  #routes: API["routes"];
  constructor(client: Client) {
    this.#API = new API(client.token, client.options);
    this.#routes = this.#API.routes;
  }

  /**
   * Get the list of private chat messages.
   *
   */
  async list(options?: {
    chatCode?: string;
    targetId?: string;
    msgId?: string;
    flag: "before" | "around" | "after";
    page?: number;
    pageSize?: number;
  }) {
    return (
      await this.#API.execute(this.#routes.directMessageList, {
        params: {
          chat_code: options?.chatCode,
          target_id: options?.targetId,
          msg_id: options?.msgId,
          flag: options?.flag,
          page: options?.page,
          page_size: options?.pageSize,
        },
      })
    ).data.data as DirectMessageList;
  }

  /**
   * Send a private chat message.
   *
   */
  async create(
    content: string,
    options?: {
      type?: "TEXT" | "KMARKDOWN" | "CARD_MESSAGE";
      targetId?: string;
      chatCode?: string;
      quote?: string;
      nonce?: string;
    }
  ): Promise<{
    msg_id: string;
    msg_timestamp: number;
    nonce: string;
  }> {
    return (
      await this.#API.execute(this.#routes.directMessageCreate, {
        data: {
          content,
          type:
            options?.type === "KMARKDOWN"
              ? 9
              : options?.type === "CARD_MESSAGE"
              ? 10
              : 1,
          chat_code: options?.chatCode,
          target_id: options?.targetId,
          quote: options?.quote,
          nonce: options?.nonce,
        },
      })
    ).data.data;
  }

  /**
   * Update private chat messages.
   *
   */
  async update(
    content: string,
    options?: {
      msgId?: string;
      quote?: string;
    }
  ) {
    return await this.#API.execute(this.#routes.directMessageUpdate, {
      data: {
        content,
        msg_id: options?.msgId,
        quote: options?.quote,
      },
    });
  }

  /**
   * Delete private chat messages.
   *
   */
  async delete(msgId: string) {
    return await this.#API.execute(this.#routes.directMessageDelete, {
      data: {
        msg_id: msgId,
      },
    });
  }

  /**
   * Get a list of users who responded to a channel message.
   *
   */
  async listReaction(msgId: string, options?: { emoji?: string }) {
    return (
      await this.#API.execute(this.#routes.directMessageListReaction, {
        params: { msg_id: msgId, emoji: options?.emoji },
      })
    ).data.data as ReactionUser[];
  }

  /**
   * Add a response to a message.
   *
   */
  async addReaction(msgId: string, emoji: string) {
    return await this.#API.execute(this.#routes.directMessageAddReaction, {
      data: { msg_id: msgId, emoji },
    });
  }

  /**
   * Delete a response to the message.
   * If no 'userId' is specified, it takes the client's one.
   */
  async deleteReaction(
    msgId: string,
    emoji: string,
    options?: { userId?: string }
  ) {
    return await this.#API.execute(this.#routes.directMessageDeleteReaction, {
      data: { msg_id: msgId, emoji, user_id: options?.userId },
    });
  }
}
