/**
 * @author iamaprin
 */
define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function listDepts() {
        return $.getJSON('./data/tree-dept.json');
    }
    exports.listDepts = listDepts;
});
