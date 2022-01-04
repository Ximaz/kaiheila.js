"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    type;
    theme;
    color;
    size;
    modules;
    fields;
    #client;
    #attachments;
    constructor(client, fromJson) {
        this.type = 'card';
        this.theme = 'primary';
        this.color = '';
        this.size = 'lg';
        this.modules = [];
        this.fields = [];
        this.#attachments = [];
        this.#client = client;
        if (fromJson instanceof Card) {
            const { type, theme, color, size, modules, fields, attachments } = fromJson;
            this.type = type;
            this.theme = theme;
            this.color = color;
            this.size = size;
            this.modules = modules;
            this.fields = fields;
            this.#attachments = attachments;
        }
        else {
            Object.assign(this, fromJson);
        }
    }
    addModule(module) {
        this.modules.push(module);
        return this;
    }
    addContentModule(type, content) {
        return this.addModule({
            type: 'section',
            text: { type, content },
        });
    }
    get attachments() {
        return this.#attachments;
    }
    setType(type) {
        this.type = type;
        return this;
    }
    setTheme(theme) {
        this.theme = theme;
        return this;
    }
    setColor(color) {
        this.color = color;
        return this;
    }
    setSize(size) {
        this.size = size;
        return this;
    }
    addParagraph(content) {
        return this.addContentModule('plain-text', content);
    }
    addPlainText(content) {
        return this.addContentModule('plain-text', content);
    }
    addKMarkdown(content) {
        return this.addContentModule('kmarkdown', content);
    }
    setAuthor(text, picture) {
        this.addTextAndPicture(text, picture);
        if (this.modules.length > 1)
            this.modules = [
                this.modules[this.modules.length - 1],
                ...this.modules.slice(0, -1),
            ];
        return this;
    }
    addTextAndPicture(text, picture) {
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
            },
        });
    }
    addHeader(content) {
        return this.addModule({
            type: 'header',
            text: { type: 'plain-text', content },
        });
    }
    addPictureGridContainer(elements) {
        return this.addModule({ type: 'image-group', elements });
    }
    addPictureContainer(elements) {
        return this.addModule({ type: 'container', elements });
    }
    addInteraction(elements) {
        return this.addModule({ type: 'action-group', elements });
    }
    addNote(type, note) {
        return this.addModule({
            type: 'context',
            elements: [
                {
                    type,
                    content: note,
                },
            ],
        });
    }
    addNotePicture(src) {
        return this.addModule({
            type: 'context',
            elements: [
                {
                    type: 'image',
                    src,
                },
            ],
        });
    }
    addDivider() {
        return this.addModule({ type: 'divider' });
    }
    addCountdownModule(startTime, endTime, mode) {
        return this.addModule({ type: 'countdown', startTime, endTime, mode });
    }
    addInviteModule(code) {
        return this.addModule({ type: 'invite', code });
    }
    addRowFields(fields, inline) {
        while (fields.length > 3) {
            this.addRowFields(fields.slice(0, 3), inline);
            fields = fields.slice(3);
        }
        const o = {
            type: 'section',
            text: {
                type: 'paragraph',
                cols: 1,
                fields: Array(),
            },
        }, f = [];
        if (!inline) {
            for (const field of Object.values(fields)) {
                f.push({
                    type: 'kmarkdown',
                    content: `**${field.name}**\n${field.value}`,
                });
            }
        }
        else {
            this.setSize('lg');
            for (const field of Object.values(fields)) {
                f.push({
                    type: 'kmarkdown',
                    content: `**${field.name}**`,
                });
            }
            for (const field of Object.values(fields)) {
                f.push({
                    type: 'kmarkdown',
                    content: field.value,
                });
            }
            o.text.cols = fields.length;
        }
        o.text.fields = f;
        return this.addModule(o);
    }
}
exports.default = Card;
