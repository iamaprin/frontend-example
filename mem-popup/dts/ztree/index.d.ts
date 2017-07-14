
interface JQuery {
    zTree: zTree
}

interface zTree {
    init: init,
    getZTreeObj: getZTreeObj,
    destroy: destroy
}

interface init {
    (obj: JQuery, zSetting: any, zNodes: any): void
}

interface getZTreeObj {
    (treeId: string): JQuery
}

interface destroy {
    (treeId: string): void
}