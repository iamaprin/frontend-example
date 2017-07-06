const NodeType = {
	SCRIPT: 'script',
	LINK: 'link'
}

export interface DivEntity {
	class: string,
	id?: string
}

export interface ScriptEntity {
	src: string
}

export interface LinkEntity {
	rel: string,
	href: string
}

export function buildScript(scriptEntity: ScriptEntity): string {
	var DEFAULT_TYPE = 'text/javascript';
	return `<script type="${DEFAULT_TYPE}" src="${scriptEntity.src}"></script>`;
}

export function buildLink(linkEntity: LinkEntity): string {
	return `<link rel="${linkEntity.rel}" href="${linkEntity.href}" />`;
}

export function buildStylesheet(href: string): string {
	return buildLink({
		rel: 'stylesheet',
		href: href
	});
}