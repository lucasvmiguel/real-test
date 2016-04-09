"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = url;
function url(action, _ref) {
	var url = _ref.url;

	if (!action.value) {
		return "\t\t\tbrowser.url(\"" + url.prefix + url.default + url.sufix + "\");";
	}

	if (!!url.prefix && !!url.default && !!url.sufix) {
		return "\t\t\tbrowser.url(\"" + url.prefix + url.default + url.sufix + "\");";
	} else if (!!url.prefix && !!url.default) {
		return "\t\t\tbrowser.url(\"" + url.prefix + url.default + action.value + "\");";
	} else if (!!url.prefix && !!url.sufix) {
		return "\t\t\tbrowser.url(\"" + url.prefix + action.value + url.sufix + "\");";
	} else if (!!url.default && !!url.sufix) {
		return "\t\t\tbrowser.url(\"" + action.value + url.default + url.sufix + "\");";
	} else if (!!url.prefix) {
		return "\t\t\tbrowser.url(\"" + url.prefix + action.value + "\");";
	} else if (!!url.default) {
		return "\t\t\tbrowser.url(\"" + url.default + action.value + "\");";
	} else if (!!url.sufix) {
		return "\t\t\tbrowser.url(\"" + action.value + url.sufix + "\");";
	} else {
		return "\t\t\tbrowser.url(\"" + action.value + "\");";
	}
}