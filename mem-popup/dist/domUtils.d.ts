export interface DivEntity {
    class: string;
    id?: string;
}
export interface ScriptEntity {
    src: string;
}
export interface LinkEntity {
    rel: string;
    href: string;
}
export declare function buildScript(scriptEntity: ScriptEntity): string;
export declare function buildLink(linkEntity: LinkEntity): string;
export declare function buildStylesheet(href: string): string;
