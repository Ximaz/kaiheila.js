import Author from "./User"

export default interface Quote {
    id: string
    type: number
    content: string
    create_at: number
    author: Author
}
