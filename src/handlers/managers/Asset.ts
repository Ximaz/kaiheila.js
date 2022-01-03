import Client from '../../index'
import API from '../API'
import FormData, { Stream } from 'form-data'

export default class AssetManager {
    #API: API
    #routes: API['routes']
    constructor(client: Client) {
        this.#API = new API(client.token, client.options)
        this.#routes = this.#API.routes
    }

    /**
     * Upload media files.
     * Supported files :
     * - pictures,
     * - videos,
     * - file.
     */
    async create(
        file: Buffer | Stream,
        options?: FormData.AppendOptions
    ): Promise<string> {
        const form = new FormData()
        form.append('file', file, options)
        return (
            await this.#API.execute(this.#routes.assetCreate, {
                data: form,
                headers: {
                    'content-type': form.getHeaders()['content-type'],
                },
            })
        ).data.data.url
    }
}
