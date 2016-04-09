"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = log;
function log(action) {
	return "\t\t\tconsole.log(" + action.value + ");";
}