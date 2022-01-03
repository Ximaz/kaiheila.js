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
        this.size = 'sm';
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
        return this;
    }
    render() {
        return JSON.stringify(this);
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
    addModule(module) {
        this.modules.push(module);
        return this;
    }
    addContentModule(module) {
        this.addModule(module);
        return this;
    }
    setAuthor(text, picture) {
        const module = {
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
        };
        this.modules = [module, ...this.modules];
        return this;
    }
    addTextAndPicture(text, picture) {
        this.addModule({
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
        return this;
    }
    addSection(mode, accessory) {
    }
    addHeader(content) {
        this.addModule({
            type: 'header',
            text: { type: 'plain-text', content },
        });
        return this;
    }
    addPictureGridContainer(elements) {
        this.addModule({ type: 'image-group', elements });
        return this;
    }
    addPictureContainer(elements) {
        this.addModule({ type: 'container', elements });
        return this;
    }
    addInteraction(elements) {
        this.addModule({ type: 'action-group', elements });
        return this;
    }
    addNote(elements) {
        this.addModule({ type: 'context', elements });
        return this;
    }
    addDivider() {
        this.addModule({ type: 'divider' });
        return this;
    }
    addCountdownModule(startTime, endTime, mode) {
        this.addModule({ type: 'countdown', startTime, endTime, mode });
        return this;
    }
    addInviteModule(code) {
        this.addModule({ type: 'invite', code });
        return this;
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
        };
        const f = [];
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
        this.addModule(o);
        return this;
    }
}
exports.default = Card;
