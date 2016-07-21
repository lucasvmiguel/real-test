'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = click;
function validate(action) {
	if (!action.selector) {
		return { error: true, message: 'missing field selector in action click or in an imported test' };
	}
	if (action.required === undefined) {
		return { error: true, message: 'missing field required in action write or in an imported test, please set required true or false' };
	}

	return { error: false };
}

function click(action) {
	var result = validate(action);
	if (result.error) {
		return result;
	}

	if (!action.timeout) action.timeout = 1;

	if (action.required) {
		return '\t\t\tbrowser.waitForElementVisible(\'' + action.selector + '\', ' + action.timeout + ', true, function(){\n\t\t\t\tthis.click(\'' + action.selector + '\');\n\t\t\t});';
	} else {
		return '\t\t\tbrowser.pause(' + action.timeout + ');\n\t\t\tbrowser.execute(elementIsExists, [\'' + action.selector + '\'], function(result){\n\t\t\t\tif(result.value)\n\t\t\t\t\tthis.click(\'' + action.selector + '\');\n\t\t\t});';
	}
}