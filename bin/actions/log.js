'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = log;
function validate(action) {
	if (!action.value) {
		return { error: true, message: 'missing field value in action log or in an imported test' };
	}
	return { error: false };
}

function log(action) {
	var result = validate(action);
	if (result.error) {
		return result;
	}

	return '\t\t\tconsole.log(' + action.value + ');';
}