"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    constructor(client) {
        this.type = 'card';
        this.theme = 'primary';
        this.#modules = [];
        this.#client = client;
    }
    #modules;
    #client;
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
        this.#modules?.push(module);
        return this;
    }
    addContentModule(module) {
        this.addModule(module);
        return this;
    }
    addSection(mode, accessory) {
    }
    addHeader(type, content) {
        if (!content)
            throw new Error('A content was awaited.');
        this.addModule({ type: 'header', text: { type, content } });
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
}
exports.default = Card;
