/// <reference types="node" />
import Client from '../../index';
import FormData, { Stream } from 'form-data';
declare type Theme = 'primary' | 'warning' | 'danger' | 'info' | 'none';
declare type Size = 'sm' | 'lg';
export declare interface ContentModule {
    type: 'header' | 'section';
    mode?: 'left' | 'right';
    text: {
        type: 'plain-text' | 'kmarkdown' | 'paragraph';
        content?: string;
    };
    accessory?: ButtonElement | PictureElement;
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
declare type Module = ContentModule | PictureGroupModule | ContainerModule | InteractiveModule | NoteModule | DividerModule | FileModule | CountdownModule | InviteModule | AreaTextStructure;
export default class Card {
    #private;
    type: 'card' | 'category';
    theme: Theme;
    color: string;
    size: Size;
    modules: Module[];
    fields: [NoteModule | KMarkdownElement][];
    constructor(client?: Client, fromJson?: object | Card);
    private addModule;
    private addContentModule;
    get attachments(): {
        attachmentName: string;
        upload: {
            file: Stream | Buffer;
            options?: FormData.AppendOptions | undefined;
        };
    }[];
    setType(type: 'card' | 'category'): this;
    setTheme(theme: Theme): this;
    setColor(color: string): this;
    setSize(size: Size): this;
    addParagraph(content: string): this;
    addPlainText(content: string): this;
    addKMarkdown(content: string): this;
    setAuthor(text: string, picture?: {
        src: PictureElement['src'];
        size: PictureElement['size'];
        circle: PictureElement['circle'];
        side: 'left' | 'right';
    }): this;
    addTextAndPicture(text: string, picture?: {
        src: PictureElement['src'];
        size: PictureElement['size'];
        circle: PictureElement['circle'];
        side: 'left' | 'right';
    }): this;
    addHeader(content: string): this;
    addPictureGridContainer(elements: PictureGroupModule['elements']): this;
    addPictureContainer(elements: ContainerModule['elements']): this;
    addInteraction(elements: InteractiveModule['elements']): this;
    addNote(type: 'plain-text' | 'kmarkdown', note: string): this;
    addNotePicture(src: string): this;
    addDivider(): this;
    addCountdownModule(startTime: CountdownModule['startTime'], endTime: CountdownModule['endTime'], mode: CountdownModule['mode']): this;
    addInviteModule(code: InviteModule['code']): this;
    addRowFields(fields: Array<{
        name: string;
        value: string;
    }>, inline?: boolean): this;
}
export {};
