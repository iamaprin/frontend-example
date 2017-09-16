import { domEntity } from './entity';


enum NodeType  {
	SCRIPT = 'script',
	LINK = 'link'
}

/**
 * 
 * @export
 * @param {domEntity.ScriptEntity} scriptEntity 
 * @returns {string} 
 */
export function buildScript(scriptEntity: domEntity.ScriptEntity): string {
	var DEFAULT_TYPE = 'text/javascript';
	return `<script type="${DEFAULT_TYPE}" src="${scriptEntity.src}"></script>`;
}

/**
 * 
 * @export
 * @param {domEntity.LinkEntity} linkEntity 
 * @returns {string} 
 */
export function buildLink(linkEntity: domEntity.LinkEntity): string {
	return `<link rel="${linkEntity.rel}" href="${linkEntity.href}" />`;
}

/**
 * 
 * @export
 * @param {string} href 
 * @returns {string} 
 */
export function buildStylesheet(href: string): string {
	return buildLink({
		rel: 'stylesheet',
		href: href
	});
}

/**
 * 插入节点
 * @param $container  插入节点的容器
 * @param node  节点数据
 * @todo 移至domUtils
 */
export function insertNode($container: JQuery, node: domEntity.Node): void {
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
