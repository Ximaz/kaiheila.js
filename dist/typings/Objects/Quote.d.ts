import { Client } from "../../index";
import Author from "./User";
export default class Quote {
    id: string;
    type: number;
    content: string;
    create_at: number;
    author: Author;
    constructor(client: Client);
}
