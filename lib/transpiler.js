const DELAY_TIME = 200;

import click     from '../actions/click';
import desktop   from '../actions/desktop';
import pause     from '../actions/pause';
import phone     from '../actions/phone';
import url       from '../actions/url';
import write     from '../actions/write';
import log       from '../actions/log';
import logger    from '../actions/logger';
import assert    from '../actions/assert';
import tablet    from '../actions/tablet';

export function replaceVariables(action, config){
	if(!config.variables){
		return action;
	}

	let returnAction = JSON.parse(JSON.stringify(action));;

	if(!!returnAction.value){
		for(let k in config.variables){
			let regex = new RegExp('!!' + k, 'g');
			returnAction.value = returnAction.value.replace(regex, config.variables[k]);
		}
	}

	if(!!returnAction.timeout){
		for(let k in config.variables){
			let regex = new RegExp('!!' + k, 'g');
			returnAction.timeout = returnAction.timeout.replace(regex, config.variables[k]);
		}
	}

	return returnAction;
}

export function actions(actions, config){
	let actionsStr = '';
	let count = 0;

	for(let action of actions){
		action = replaceVariables(action, config);
		actionsStr += `			//Instrução ${++count}\n`;
		actionsStr += transpileAction(action, config) + '\n';
		actionsStr += pause({value: DELAY_TIME}) + '\n';
		actionsStr += logger() + '\n\n';
	}

	return actionsStr;
}

export function header(tag){
	return `var colors = require('colors/safe')	;

module.exports = {
	tags:[\'${tag}\'],
	\'${tag}\': function(browser) {;
			var elementIsExists = function(selector) {
				return document.querySelector(selector);
			};

			var logger = function(logs) {
				for(var i in logs){
					if(!!colors){
						if(logs[i].message.indexOf('status of 4') > -1){
							console.log(colors.yellow('[ERROR CLIENT] ' + logs[i].message));
						}
						else if(logs[i].message.indexOf('status of 5') > -1){
							console.log(colors.red('[ERROR API]    ' + logs[i].message));
						}
						else if(logs[i].level === 'SEVERE'){
							console.log(colors.blue('[SEVERE]       ' + logs[i].message));
						}
						else if(logs[i].level === 'WARNING'){
							console.log(colors.grey('[WARNING]      ' + logs[i].message));
						}
						else{
							console.log(colors.grey('[' + logs[i].level + ']      ' + logs[i].message));
						}
					}else{
						console.log('[' + logs[i].level + ']      ' + logs[i].message);
					}
				}
			};

`;
}

export function footer(){
	return `			browser.end();
	}};`;
}

function transpileAction(action, config){
	switch(action.action){
		case 'url':
			return url(action, config);
		case 'phone':
			return phone(action);
		case 'desktop':
			return desktop(action);
		case 'pause':
			return pause(action);
		case 'click':
			return click(action);
		case 'write':
			return write(action);
		case 'log':
			return log(action);
		case 'assert':
			return assert(action);
		case 'tablet':
			return tablet(action);
	}
}
