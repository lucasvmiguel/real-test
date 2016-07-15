import R from 'ramda';
import colors from 'colors';

import click     from './actions/click';
import pause     from './actions/pause';
import url       from './actions/url';
import write     from './actions/write';
import log       from './actions/log';
import logger    from './actions/logger';
import assert    from './actions/assert';
import resize    from './actions/resize';
import cookie    from './actions/cookie';

const DELAY_TIME = 200;

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

	for(let action of actions){
		if(R.prop('action', action) !== 'header' &&
			 R.prop('action', action) !== 'import' &&
			 !R.prop('title', action)){

			action = replaceVariables(action, config);

			var actionString = transpileAction(action, config);
			if (actionString.error) {
				return actionString;
			}

			actionsStr += actionString + '\n';
			actionsStr += pause({value: DELAY_TIME}) + '\n';
			actionsStr += logger() + '\n\n';
		}
	}

	return actionsStr;
}

export function header(tag){
	return `module.exports = {
	tags:[\'${tag}\'],
	\'${tag}\': function(browser) {;
			var elementIsExists = function(selector) {
				return document.querySelector(selector);
			};

			var logger = function(logs) {
				for(var i in logs){
					if(logs[i].message.indexOf('status of 4') > -1){
						console.log('[ERROR CLIENT] ' + logs[i].message);
					}
					else if(logs[i].message.indexOf('status of 5') > -1){
						console.log('[ERROR API]    ' + logs[i].message);
					}
					else if(logs[i].level === 'SEVERE'){
						console.log('[SEVERE]       ' + logs[i].message);
					}
					else if(logs[i].level === 'WARNING'){
						console.log('[WARNING]      ' + logs[i].message);
					}
					else{
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
		case 'resize':
			return resize(action);
		case 'cookie':
			return cookie(action);
		default:
			console.log(colors.red('Error: invalid action: ' + action.action));
			process.exit();
	}
}

export function shouldTranspileTest(actions, config){

	if(!config.name) return false;
	if(!actions.length) return false;

	if(R.prop('type', actions[1]) === 'helper') return false;

	if(!!actions[1].only){
		if(actions[1].only === config.name)
			return true;
		else
			return false;
	}

	if(!!actions[1].notOnly){
		if(actions[1].notOnly !== config.name)
			return true;
		else
			return false;
	}

	return true;
}
