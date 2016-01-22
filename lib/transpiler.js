const DELAY_TIME = 200;

import click     from '../actions/click';
import desktop   from '../actions/desktop';
import pause     from '../actions/pause';
import phone     from '../actions/phone';
import read      from '../actions/read';
import url       from '../actions/url';
import write     from '../actions/write';
import log       from '../actions/log';
import logger    from '../actions/logger';
import assert    from '../actions/assert';

export function transpileActions(actions, config){
	let actionsStr = '';
	let count = 0;

	for(let action of actions){
		actionsStr += `			//Instrução ${++count}\n`;
		actionsStr += transpileAction(action, config) + '\n';
		actionsStr += pause({value: DELAY_TIME}) + '\n';
		actionsStr += logger() + '\n\n';
	}

	return actionsStr;
}

export function transpileHeader(tag){
	return `module.exports = {
	tags:[\'${tag}\'],
	\'${tag}\': function(browser) {;
			var elementIsExists = function(selector) {
				return document.querySelector(selector);
			};

			var logger = function(logs) {
				for(var i in logs){
					console.log('[' + logs[i].level + ']' + logs[i].message);
				}
			};

`;
}

export function transpileFooter(){
	return `			browser.end();
	}};`;
}

function transpileAction(action, config){
	switch(action.action){
		case 'url':
			return url(action, config);
			break;
		case 'phone':
			return phone(action);
			break;
		case 'desktop':
			return desktop(action);
			break;
		case 'pause':
			return pause(action);
			break;
		case 'click':
			return click(action);
			break;
		case 'write':
			return write(action);
			break;
		case 'read':
			return read(action);
			break;
		case 'log':
			return log(action);
			break;
		case 'assert':
			return assert(action);
			break;
	}
}