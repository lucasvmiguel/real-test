"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = pause;
function pause(action) {
	if (!action.value) return "\t\t\tbrowser.pause(100);";
	return "\t\t\tbrowser.pause(" + action.value + ");";
}