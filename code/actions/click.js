#!/usr/bin/env node

export default function click(action){

	if(!action.timeout) action.timeout = 1;

	if(action.required){
		return `			browser.waitForElementVisible('${action.selector}', ${action.timeout}, true, function(){
				this.click('${action.selector}');
			});`;
	}else{
		return `			browser.pause(${action.timeout});
			browser.execute(elementIsExists, ['${action.selector}'], function(result){
				if(result.value)
					this.click('${action.selector}');
			});`;
	}
}
