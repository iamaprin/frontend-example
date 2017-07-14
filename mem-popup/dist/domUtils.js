define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const NodeType = {
        SCRIPT: 'script',
        LINK: 'link'
    };
    function buildScript(scriptEntity) {
        var DEFAULT_TYPE = 'text/javascript';
        return `<script type="${DEFAULT_TYPE}" src="${scriptEntity.src}"></script>`;
    }
    exports.buildScript = buildScript;
    function buildLink(linkEntity) {
        return `<link rel="${linkEntity.rel}" href="${linkEntity.href}" />`;
    }
    exports.buildLink = buildLink;
    function buildStylesheet(href) {
        return buildLink({
            rel: 'stylesheet',
            href: href
        });
    }
    exports.buildStylesheet = buildStylesheet;
});
