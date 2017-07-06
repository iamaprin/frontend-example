/**
 * 
 */


import $ = require('jquery');
import * as domUtils from './domUtils'

function init() {
	console.log('mem-popup');
	buildFramework();
}

interface Options {
	width: number,
	height: number
}


function buildFramework() {
	// let layout = ['mem-popup', ''];

	let $main = $('<div class="mem-popup">');

	let $header = $('<div class="mp-header"></div>');
	let $content = $('<div class="mp-content"></div>');
	let $footer = $('<div class="mp-footer"></div>');

	let $contentLeft = $('<div class="mp-content-left"></div>');
	let $contentMiddle = $('<div class="mp-content-middle"></div>');
	let $contentRight = $('<div class="mp-content-right"></div>');

	$content.append($contentLeft).append($contentMiddle).append($contentRight);

	$main.append($header).append($content).append($footer);

	$('head').append(domUtils.buildStylesheet('./style/mem-popup.css'));
	$('body').append($main);
}

export = {
	init: init
}