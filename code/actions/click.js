function validate(action){
	if (!action.selector) {
		return {error: true, message: 'missing field selector in action click or in an imported test'};
	}

	return {error: false};
}

export default function click(action){
	var result = validate(action);
	if (result.error) {
		return result;
	}

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
