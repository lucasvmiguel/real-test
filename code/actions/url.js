export default function url(action, {url}){
	if(!action.value){
		return `			browser.url("${url.prefix}${url.default}${url.sufix}");`;
	}

	if(!!url.prefix && !!url.default && !!url.sufix){
		return `			browser.url("${url.prefix}${url.default}${url.sufix}");`;
	}
	else if(!!url.prefix && !!url.default){
		return `			browser.url("${url.prefix}${url.default}${action.value}");`;
	}
	else if(!!url.prefix && !!url.sufix){
		return `			browser.url("${url.prefix}${action.value}${url.sufix}");`;
	}
	else if(!!url.default && !!url.sufix){
		return `			browser.url("${action.value}${url.default}${url.sufix}");`;
	}
	else if(!!url.prefix){
		return `			browser.url("${url.prefix}${action.value}");`;
	}
	else if(!!url.default){
		return `			browser.url("${url.default}${action.value}");`;
	}
	else if(!!url.sufix){
		return `			browser.url("${action.value}${url.sufix}");`;
	}
	else{
		return `			browser.url("${action.value}");`;
	}
}
