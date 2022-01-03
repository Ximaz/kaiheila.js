import Client from "src";
declare type Theme = 'primary' | 'warning' | 'danger' | 'info' | 'none';
declare type Size = 'sm' | 'lg';
export declare interface ContentModule {
    type: 'header' | 'section';
    mode?: 'left' | 'right';
    text: {
        type: 'plain-text' | 'kmarkdown' | 'paragraph';
        content?: string;
    };
    accessory?: ButtonElement;
}
export declare interface PictureGroupModule {
    type: 'image-group';
    elements: PictureElement[];
}
export declare interface ContainerModule {
    type: 'container';
    elements: PictureElement[];
}
export declare interface InteractiveModule {
    type: 'action-group';
    elements: ButtonElement[];
}
export declare interface NoteModule {
    type: 'context';
    elements: [ContentModule['text'] | KMarkdownElement | PictureElement][];
}
export declare interface DividerModule {
    type: 'divider';
}
export declare interface FileModule {
    type: 'file' | 'audio' | 'video';
    src: string;
    title: string;
    cover: string;
}
export declare interface CountdownModule {
    type: 'countdown';
    endTime: number;
    startTime: number;
    mode: 'day' | 'hour' | 'second';
}
export declare interface InviteModule {
    type: 'invite';
    code: string;
}
export declare interface NormalElement {
    type: 'plain-text';
    content: string;
    emoji: boolean;
}
export declare interface KMarkdownElement {
    type: 'kmarkdown';
    content: string;
}
export declare interface PictureElement {
    type: 'image';
    src: string;
    alt: string;
    size: Size;
    circle: boolean;
}
export declare interface ButtonElement {
    type: 'button';
    theme: Theme;
    value: string;
    click: 'return-val';
    text: ContentModule['text'] | KMarkdownElement;
}
export declare interface AreaTextStructure {
    type: 'paragraph';
    cols: 1 | 2 | 3;
    fields: [NoteModule | KMarkdownElement][];
}
declare type Module = ContentModule | PictureGroupModule | ContainerModule | InteractiveModule | NoteModule | DividerModule | FileModule | CountdownModule | InviteModule;
export default class Card {
    #private;
    type: 'card' | 'category';
    theme?: Theme;
    color?: string;
    size?: Size;
    constructor(client: Client);
    setType(type: 'card' | 'category'): this;
    setTheme(theme: Theme): this;
    setColor(color: string): this;
    setSize(size: Size): this;
    addModule(module: Module): this;
    addContentModule(module: ContentModule): this;
    addSection(mode: ContentModule['mode'], accessory: ContentModule['accessory']): void;
    addHeader(type: ContentModule['text']['type'], content: ContentModule['text']['content']): void;
    addPictureGridContainer(elements: PictureGroupModule['elements']): this;
    addPictureContainer(elements: ContainerModule['elements']): this;
    addInteraction(elements: InteractiveModule['elements']): this;
    addNote(elements: NoteModule['elements']): this;
    addDivider(): this;
    addCountdownModule(startTime: CountdownModule['startTime'], endTime: CountdownModule['endTime'], mode: CountdownModule['mode']): this;
    addInviteModule(code: InviteModule['code']): this;
}
export {};
