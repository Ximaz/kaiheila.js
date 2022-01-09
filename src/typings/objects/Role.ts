export default class Role {
    role_id: number
    name: string
    color: number
    position: number
    hoist: number
    mentionable: number
    permissions: number
    constructor() {
        this.role_id = 0
        this.name = ''
        this.color = 0
        this.position = 0
        this.hoist = 0
        this.mentionable = 0
        this.permissions = 0
    }
}
