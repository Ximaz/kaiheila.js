import Client from '../../index'
import FormData, { Stream } from 'form-data'

declare type Theme = 'primary' | 'warning' | 'danger' | 'info' | 'none'

declare type Size = 'sm' | 'lg'

export declare interface ContentModule {
    type: 'header' | 'section'
    mode?: 'left' | 'right' // accessory.type.button cannot be placed on the left.
    text: {
        type: 'plain-text' | 'kmarkdown' | 'paragraph'
        content?: string // Up to 100 characters.
    }
    accessory?: ButtonElement | PictureElement
}

// Same as ContainerModule but will cut pictures into square pieces.
export declare interface PictureGroupModule {
    type: 'image-group'
    elements: PictureElement[] // Up to 1-9 image(s).
}

// Same as PictureGroupeModule but won't cut pictures into square pieces.
export declare interface ContainerModule {
    type: 'container'
    elements: PictureElement[] // Up to 1-9 image(s).
}

export declare interface InteractiveModule {
    type: 'action-group'
    elements: ButtonElement[] // Up to 4 buttons.
}

export declare interface NoteModule {
    type: 'context'
    elements: [ContentModule['text'] | KMarkdownElement | PictureElement][] // Can be 'plain-text' | 'kmarkdown' | 'image'. Up to 10 elements.
}

export declare interface DividerModule {
    type: 'divider'
}

export declare interface FileModule {
    type: 'file' | 'audio' | 'video'
    src: string
    title: string
    cover: string
}

export declare interface CountdownModule {
    type: 'countdown'
    endTime: number
    startTime: number
    mode: 'day' | 'hour' | 'second'
}

export declare interface InviteModule {
    type: 'invite'
    code: string
}

export declare interface NormalElement {
    type: 'plain-text'
    content: string // Up to 2000 characters.
    emoji: boolean
}

export declare interface KMarkdownElement {
    type: 'kmarkdown'
    content: string // Up to 5000 characters.
}

/**
 * Supported MIME types :
 *
 * image/jpeg
 * image/gif
 * image/pngthese
 *
 */
export declare interface PictureElement {
    type: 'image'
    src: string
    alt: string
    size: Size
    circle: boolean
}

export declare interface ButtonElement {
    type: 'button'
    theme: Theme
    value: string
    click: 'return-val' // 'return-val' Returns the ButtonElement.value once clicked.
    // Can also be a link where the user will be redirected to once clicked.
    text: ContentModule['text'] | KMarkdownElement
}

export declare interface AreaTextStructure {
    type: 'paragraph'
    cols: 1 | 2 | 3
    fields: [NoteModule | KMarkdownElement][]
}

declare type Module =
    | ContentModule
    | PictureGroupModule
    | ContainerModule
    | InteractiveModule
    | NoteModule
    | DividerModule
    | FileModule
    | CountdownModule
    | InviteModule
    | AreaTextStructure

export default class Card {
    type: 'card' | 'category'
    theme: Theme
    color: string
    size: Size
    modules: Module[] // Up to 50.
    fields: [NoteModule | KMarkdownElement][]
    #client?: Client
    #attachments: {
        attachmentName: string
        upload: { file: Buffer | Stream; options?: FormData.AppendOptions }
    }[]
    constructor(client?: Client, fromJson?: object | Card) {
        this.type = 'card'
        this.theme = 'primary'
        this.color = ''
        this.size = 'lg'
        this.modules = []
        this.fields = []
        this.#attachments = []
        this.#client = client
        if (fromJson instanceof Card) {
            const { type, theme, color, size, modules, fields, attachments } =
                fromJson
            this.type = type
            this.theme = theme
            this.color = color
            this.size = size
            this.modules = modules
            this.fields = fields
            this.#attachments = attachments
        } else {
            Object.assign(this, fromJson)
        }
    }

    private addModule(module: Module) {
        this.modules.push(module)
        return this
    }

    private addContentModule(
        type: ContentModule['text']['type'],
        content: string
    ) {
        return this.addModule({
            type: 'section',
            text: { type, content },
        } as ContentModule)
    }

    get attachments() {
        return this.#attachments
    }

    setType(type: 'card' | 'category'): this {
        this.type = type
        return this
    }

    setTheme(theme: Theme): this {
        this.theme = theme
        return this
    }

    setColor(color: string): this {
        this.color = color
        return this
    }

    setSize(size: Size): this {
        this.size = size
        return this
    }

    addParagraph(content: string) {
        return this.addContentModule('paragraph', content)
    }

    addPlainText(content: string) {
        return this.addContentModule('plain-text', content)
    }

    addKMarkdown(content: string) {
        return this.addContentModule('kmarkdown', content)
    }

    setAuthor(
        text: string,
        picture?: {
            src: PictureElement['src']
            size: PictureElement['size']
            circle: PictureElement['circle']
            side: 'left' | 'right'
        }
    ) {
        this.addTextAndPicture(text, picture)
        this.modules = [this.modules[this.modules.length], ...this.modules]
        return this
    }

    addTextAndPicture(
        text: string,
        picture?: {
            src: PictureElement['src']
            size: PictureElement['size']
            circle: PictureElement['circle']
            side: 'left' | 'right'
        }
    ) {
        return this.addModule({
            type: 'section',
            text: {
                type: 'plain-text',
                content: text,
            },
            mode: picture?.side || 'left',
            accessory: {
                type: 'image',
                ...picture,
            } as PictureElement,
        })
    }

    /**
    addSection(
        mode: ContentModule['mode'],
        accessory: ContentModule['accessory']
    ) {
        this.addModule({ type: 'section', mode, accessory })
    }

    addAttachment(
        attachmentName: string,
        file: Buffer | Stream,
        options?: FormData.AppendOptions
    ) {
        this.#attachments.push({
            attachmentName,
            upload: { file, options },
        })
    }
    */

    addHeader(content: string) {
        return this.addModule({
            type: 'header',
            text: { type: 'plain-text', content },
        })
    }

    addPictureGridContainer(elements: PictureGroupModule['elements']) {
        return this.addModule({ type: 'image-group', elements })
    }

    addPictureContainer(elements: ContainerModule['elements']) {
        return this.addModule({ type: 'container', elements })
    }

    addInteraction(elements: InteractiveModule['elements']) {
        return this.addModule({ type: 'action-group', elements })
    }

    addNote(type: ContentModule['text']['type'], note: string) {
        return this.addModule({
            type: 'context',
            elements: [
                {
                    type,
                    content: note,
                },
            ],
        } as unknown as NoteModule)
    }

    addNotePicture(src: string) {
        return this.addModule({
            type: 'context',
            elements: [
                {
                    type: 'image',
                    src,
                },
            ],
        } as unknown as NoteModule)
    }

    addDivider() {
        return this.addModule({ type: 'divider' })
    }

    addCountdownModule(
        startTime: CountdownModule['startTime'],
        endTime: CountdownModule['endTime'],
        mode: CountdownModule['mode']
    ) {
        return this.addModule({ type: 'countdown', startTime, endTime, mode })
    }

    addInviteModule(code: InviteModule['code']) {
        return this.addModule({ type: 'invite', code })
    }

    addRowFields(
        fields: Array<{ name: string; value: string }>,
        inline?: boolean
    ) {
        while (fields.length > 3) {
            this.addRowFields(fields.slice(0, 3), inline)
            fields = fields.slice(3)
        }
        const o = {
                type: 'section',
                text: {
                    type: 'paragraph',
                    cols: 1,
                    fields: Array<{ type: string; content: string }>(),
                },
            },
            f = []
        if (!inline) {
            for (const field of Object.values(fields)) {
                f.push({
                    type: 'kmarkdown',
                    content: `**${field.name}**\n${field.value}`,
                })
            }
        } else {
            this.setSize('lg')
            for (const field of Object.values(fields)) {
                f.push({
                    type: 'kmarkdown',
                    content: `**${field.name}**`,
                })
            }
            for (const field of Object.values(fields)) {
                f.push({
                    type: 'kmarkdown',
                    content: field.value,
                })
            }
            o.text.cols = fields.length
        }
        o.text.fields = f
        return this.addModule(o as unknown as AreaTextStructure)
    }
}
