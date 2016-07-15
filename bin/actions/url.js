'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = url;
function validate(action) {
	if (!action.value) {
		return { error: true, message: 'missing field value in action url or in an imported test' };
	}
	return { error: false };
}

function url(action) {
	var result = validate(action);
	if (result.error) {
		return result;
	}

	return '\t\t\tbrowser.url("' + action.value + '");';
}