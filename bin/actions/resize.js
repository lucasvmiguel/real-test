'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = resize;
function validate(action) {
	if (!action.value) {
		return { error: true, message: 'missing field value in action log or in an imported test or in an imported test' };
	}

	if (action.value !== 'tablet' && action.value !== 'desktop' && action.value !== 'mobile') {
		return { error: true, message: 'invalid field value in action resize or in an imported test, options available: tablet | desktop | mobile' };
	}
	return { error: false };
}

function resize(action) {
	var result = validate(action);
	if (result.error) {
		return result;
	}

	if (action.value === 'tablet') {
		return '\t\t\tbrowser.resizeWindow(768, 1024);';
	}
	if (action.value === 'mobile') {
		return '\t\t\tbrowser.resizeWindow(375, 627);';
	}
	if (action.value === 'desktop') {
		return '\t\t\tbrowser.resizeWindow(1280, 950);';
	}
}