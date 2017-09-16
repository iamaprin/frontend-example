define(["require", "exports", "jquery", "./event", "./apis", "./dom-utils", "ztree"], function (require, exports, $, event_1, apis, domUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 人员选择弹出框
     * @export
     * @class MemPopup
     * @extends {EventDispatcher}
     */
    class MemPopup extends event_1.EventDispatcher {
        /**
         * 初始化
         *
         * @memberof MemPopup
         */
        init() {
            this.buildMain();
            this.initDeptTree();
            this.onEvent();
        }
        /**
         * 事件监听
         *
         * @memberof MemPopup
         */
        onEvent() {
            this.onTreeNodeClick();
            this.onSelectableItemsClick();
            this.onSelectedItemsClick();
        }
        /**
         * 初始化部门树
         *
         * @private
         * @memberof MemPopup
         */
        initDeptTree() {
            apis.listDepts().then(data => {
                this.buildTree(data);
            });
        }
        /**
         * 构建树形部门结构
         * @param {memPopupEntity.TreeNode<number>} data
         */
        buildTree(data) {
            let __this = this;
            let setting = {
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: onClick
                }
            };
            let $tree = $('#ztree');
            $.fn.zTree.init($tree, setting, data);
            function onClick(event, treeId, treeNode) {
                __this.fire('memPopup.treeNode.click', treeNode);
            }
        }
        /**
         * 监听左侧树节点点击事件
         * @private
         * @memberof MemPopup
         */
        onTreeNodeClick() {
            this.register('memPopup.treeNode.click', (data) => {
                let id = data.id; // no use in demo
                apis.getMemByDept().then(data => {
                    this.buildMidList(data);
                });
            });
        }
        /**
         * 监听待选择列表事件
         *
         * @private
         * @memberof MemPopup
         */
        onSelectableItemsClick() {
            let $selectableItems = $('#selectable_items');
            let $selectedItems = $('#selected_items');
            $selectableItems.on('dblclick', 'li', event => {
                let $this = $(event.currentTarget);
                $selectedItems.append($this.clone());
            });
        }
        /**
         * 监听已选择事件列表
         *
         * @private
         * @memberof MemPopup
         */
        onSelectedItemsClick() {
            let $selectedItems = $('#selected_items');
            $selectedItems.on('dblclick', 'li', event => {
                let $this = $(event.currentTarget);
                $this.remove();
            });
        }
        buildMidList(members) {
            let $selectableItems = $('#selectable_items');
            $selectableItems.empty();
            members.forEach(member => {
                let $li = $(`<li>${member.name}</li>`).data(member);
                $selectableItems.append($li);
            });
        }
        buildMain() {
            let $head = $('head');
            $head.append(domUtils.buildStylesheet('./lib/ztree/css/metroStyle/metroStyle.css'));
            $head.append(domUtils.buildStylesheet('./style/mem-popup.css'));
            domUtils.insertNode($('body'), nodes);
        }
    }
    exports.MemPopup = MemPopup;
    const nodes = {
        tag: 'div',
        class: 'mem-popup',
        childNodes: [
            {
                tag: 'div',
                class: 'mp-header',
            },
            {
                tag: 'div',
                class: 'mp-content',
                childNodes: [
                    {
                        tag: 'div',
                        class: 'mp-content-left',
                        childNodes: [
                            {
                                tag: 'div',
                                class: 'mp-tree-container ztree',
                                id: 'ztree'
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        class: 'mp-content-middle',
                        childNodes: [
                            {
                                tag: 'div',
                                class: 'mp-selectable',
                                childNodes: [
                                    {
                                        tag: 'ul',
                                        class: '',
                                        id: 'selectable_items'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        class: 'mp-content-right',
                        childNodes: [
                            {
                                tag: 'div',
                                class: 'mp-selectable',
                                childNodes: [
                                    {
                                        tag: 'ul',
                                        class: '',
                                        id: 'selected_items'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                tag: 'div',
                class: 'mp-footer',
                childNodes: [
                    {
                        tag: 'div',
                        class: 'mp-foot-btns-container',
                        childNodes: [
                            {
                                tag: 'button',
                                class: 'mp-foot-btns',
                                text: '确定',
                            },
                            {
                                tag: 'button',
                                class: 'mp-foot-btns',
                                text: '取消',
                            }
                        ]
                    }
                ]
            }
        ]
    };
});
//# sourceMappingURL=mem-popup.js.map