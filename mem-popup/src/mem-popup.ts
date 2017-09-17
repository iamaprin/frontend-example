/**
 * @author iamaprin
 */
import * as $ from 'jquery';
import { EventDispatcher } from './event';
import { memPopupEntity, domEntity } from './entity';
import * as apis from './apis';
import * as domUtils from './dom-utils';
// requirejs
import 'ztree'

/**
 * 人员选择弹出框
 * @export
 * @class MemPopup
 * @extends {EventDispatcher}
 */
export class MemPopup extends EventDispatcher {

	private selected: string[] = [];

	/**
	 * 初始化
	 * 
	 * @memberof MemPopup
	 */
	init(): void {
		this.buildMain();
		this.initDeptTree();
		this.onEvent();
	}

	/**
	 * 事件监听
	 * 
	 * @memberof MemPopup
	 */
	onEvent(): void {
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
	private initDeptTree() {
		apis.listDepts().then(data => {
			this.buildTree(data);
		});
	}

    /**
     * 构建树形部门结构
     * @param {memPopupEntity.TreeNode<number>} data
     */
	private buildTree(data: memPopupEntity.TreeNode<number>): void {
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

		function onClick(event: Event, treeId: string, treeNode: JSON) {
			__this.fire('memPopup.treeNode.click', treeNode);
		}
	}

	/**
	 * 监听左侧树节点点击事件
	 * @private
	 * @memberof MemPopup
	 */
	private onTreeNodeClick(): void {
		this.register('memPopup.treeNode.click', (data: memPopupEntity.TreeNode<number>) => {
			let id = data.id;		// no use in demo
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
	private onSelectableItemsClick(): void {
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
	private onSelectedItemsClick(): void {
		let $selectedItems = $('#selected_items');
		$selectedItems.on('dblclick', 'li', event => {
			let $this = $(event.currentTarget);
			$this.remove();
		});
	}

	private buildMidList(members: memPopupEntity.MemberResp[]): void {
		let $selectableItems = $('#selectable_items');
		$selectableItems.empty();
		members.forEach(member => {
			let $li = $(`<li>${member.name}</li>`).data(member);
			$selectableItems.append($li);
		});
	}

	private buildMain(): void {
		let $head = $('head');
		$head.append(domUtils.buildStylesheet('./lib/ztree/css/metroStyle/metroStyle.css'));
		$head.append(domUtils.buildStylesheet('./style/mem-popup.css'));
		domUtils.insertNode($('body'), nodes);
	}

}

const nodes: domEntity.Node = {
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
							class: 'mp-selected',
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
}
