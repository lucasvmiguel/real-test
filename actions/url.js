export default function url(action, {url}){
	if(!action.value)
		return `			browser.url("${url.prefix}${url.default}${url.sufix}");`;
	return `			browser.url("${action.value}");`;
}
