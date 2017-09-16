define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NodeType;
    (function (NodeType) {
        NodeType["SCRIPT"] = "script";
        NodeType["LINK"] = "link";
    })(NodeType || (NodeType = {}));
    /**
     *
     * @export
     * @param {domEntity.ScriptEntity} scriptEntity
     * @returns {string}
     */
    function buildScript(scriptEntity) {
        var DEFAULT_TYPE = 'text/javascript';
        return `<script type="${DEFAULT_TYPE}" src="${scriptEntity.src}"></script>`;
    }
    exports.buildScript = buildScript;
    /**
     *
     * @export
     * @param {domEntity.LinkEntity} linkEntity
     * @returns {string}
     */
    function buildLink(linkEntity) {
        return `<link rel="${linkEntity.rel}" href="${linkEntity.href}" />`;
    }
    exports.buildLink = buildLink;
    /**
     *
     * @export
     * @param {string} href
     * @returns {string}
     */
    function buildStylesheet(href) {
        return buildLink({
            rel: 'stylesheet',
            href: href
        });
    }
    exports.buildStylesheet = buildStylesheet;
    /**
     * 插入节点
     * @param $container  插入节点的容器
     * @param node  节点数据
     * @todo 移至domUtils
     */
    function insertNode($container, node) {
        let $childNode = $(`<${node.tag}>`).addClass(node.class);
        let value = node.value;
        if (value) {
            $childNode.val(value);
        }
        let text = node.text;
        if (text) {
            $childNode.text(text);
        }
        let id = node.id;
        if (id) {
            $childNode.attr('id', id);
        }
        let childNodes = node.childNodes;
        if (childNodes) {
            childNodes.forEach(element => {
                insertNode($childNode, element);
            });
        }
        $container.append($childNode);
    }
    exports.insertNode = insertNode;
});
//# sourceMappingURL=dom-utils.js.map