'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.replaceVariables = replaceVariables;
exports.actions = actions;
exports.header = header;
exports.footer = footer;
exports.shouldTranspileTest = shouldTranspileTest;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _click = require('./actions/click');

var _click2 = _interopRequireDefault(_click);

var _pause = require('./actions/pause');

var _pause2 = _interopRequireDefault(_pause);

var _url = require('./actions/url');

var _url2 = _interopRequireDefault(_url);

var _write = require('./actions/write');

var _write2 = _interopRequireDefault(_write);

var _log = require('./actions/log');

var _log2 = _interopRequireDefault(_log);

var _logger = require('./actions/logger');

var _logger2 = _interopRequireDefault(_logger);

var _assert = require('./actions/assert');

var _assert2 = _interopRequireDefault(_assert);

var _resize = require('./actions/resize');

var _resize2 = _interopRequireDefault(_resize);

var _cookie = require('./actions/cookie');

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DELAY_TIME = 200;

function replaceVariables(action, config) {
	if (!config.variables) {
		return action;
	}

	var returnAction = JSON.parse(JSON.stringify(action));;

	if (!!returnAction.value) {
		for (var k in config.variables) {
			var regex = new RegExp('!!' + k, 'g');
			returnAction.value = returnAction.value.replace(regex, config.variables[k]);
		}
	}

	if (!!returnAction.timeout) {
		for (var _k in config.variables) {
			var _regex = new RegExp('!!' + _k, 'g');
			returnAction.timeout = returnAction.timeout.replace(_regex, config.variables[_k]);
		}
	}

	return returnAction;
}

function actions(actions, config) {
	var actionsStr = '';

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = actions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var action = _step.value;

			if (_ramda2.default.prop('action', action) !== 'header' && _ramda2.default.prop('action', action) !== 'import' && !_ramda2.default.prop('title', action)) {

				action = replaceVariables(action, config);

				var actionString = transpileAction(action, config);
				if (actionString.error) {
					return actionString;
				}

				actionsStr += actionString + '\n';
				actionsStr += (0, _pause2.default)({ value: DELAY_TIME }) + '\n';
				actionsStr += (0, _logger2.default)() + '\n\n';
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return actionsStr;
}

function header(tag) {
	return 'module.exports = {\n\ttags:[\'' + tag + '\'],\n\t\'' + tag + '\': function(browser) {;\n\t\t\tvar elementIsExists = function(selector) {\n\t\t\t\treturn document.querySelector(selector);\n\t\t\t};\n\n\t\t\tvar logger = function(logs) {\n\t\t\t\tfor(var i in logs){\n\t\t\t\t\tif(logs[i].message.indexOf(\'status of 4\') > -1){\n\t\t\t\t\t\tconsole.log(\'[ERROR CLIENT] \' + logs[i].message);\n\t\t\t\t\t}\n\t\t\t\t\telse if(logs[i].message.indexOf(\'status of 5\') > -1){\n\t\t\t\t\t\tconsole.log(\'[ERROR API]    \' + logs[i].message);\n\t\t\t\t\t}\n\t\t\t\t\telse if(logs[i].level === \'SEVERE\'){\n\t\t\t\t\t\tconsole.log(\'[SEVERE]       \' + logs[i].message);\n\t\t\t\t\t}\n\t\t\t\t\telse if(logs[i].level === \'WARNING\'){\n\t\t\t\t\t\tconsole.log(\'[WARNING]      \' + logs[i].message);\n\t\t\t\t\t}\n\t\t\t\t\telse{\n\t\t\t\t\t\tconsole.log(\'[\' + logs[i].level + \']      \' + logs[i].message);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t};\n\n';
}

function footer() {
	return '\t\t\tbrowser.end();\n\t}};';
}

function transpileAction(action, config) {
	switch (action.action) {
		case 'url':
			return (0, _url2.default)(action, config);
		case 'pause':
			return (0, _pause2.default)(action);
		case 'click':
			return (0, _click2.default)(action);
		case 'write':
			return (0, _write2.default)(action);
		case 'log':
			return (0, _log2.default)(action);
		case 'assert':
			return (0, _assert2.default)(action);
		case 'resize':
			return (0, _resize2.default)(action);
		case 'cookie':
			return (0, _cookie2.default)(action);
		default:
			console.log(_colors2.default.red('Error: invalid action: ' + action.action));
			process.exit();
	}
}

function shouldTranspileTest(actions, config) {
	console.log('a');
	if (!config.name) return false;
	if (!actions.length) return false;
	console.log('b');
	if (_ramda2.default.prop('type', actions[1]) === 'helper') return false;
	console.log('c');
	if (!!actions[1].only) {
		if (actions[1].only === config.name) return true;else return false;
	}
	console.log('d');

	if (!!actions[1].notOnly) {
		if (actions[1].notOnly !== config.name) return true;else return false;
	}

	return true;
}