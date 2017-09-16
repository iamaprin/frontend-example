/**
 * @author iamaprin
 */

export namespace memPopupEntity {
    /**
     * 树形结构
     */
    export type TreeNode<T> = {
        id: T,
        pId: T,
        name: string
    }

    export type MemberResp = {
        name: string
        tel: string
    }
}

export namespace domEntity {

    export type DivEntity = {
        class: string,
        id?: string
    }
    
    export type ScriptEntity = {
        src: string
    }
    
    export type LinkEntity = {
        rel: string,
        href: string
    }

    export type Node = {
        tag: string,
        class: string,
        id?: string,
        value?: string,
        text?: string,
        childNodes?: Array<Node>
    }
}