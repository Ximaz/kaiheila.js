import { Client } from "../../index"
import User from "./User"
import Author from "./User"

export default class Quote {
    id: string
    type: number
    content: string
    create_at: number
    author: Author
    constructor(client: Client) {
        this.id = ''
        this.type = 0
        this.content = ''
        this.create_at = 0
        this.author = new User()
    }
}
