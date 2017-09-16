define(["require", "exports", "./ajax"], function (require, exports, ajax_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 获取部门列表（树形结构数据）
     * @returns {Promise<memPopupEntity.TreeNode<number>>}
     */
    function listDepts() {
        return new ajax_1.Ajax().get('./data/tree-depts.json');
    }
    exports.listDepts = listDepts;
    function getMemByDept() {
        return new ajax_1.Ajax().get('./data/members.json');
    }
    exports.getMemByDept = getMemByDept;
});
//# sourceMappingURL=apis.js.map