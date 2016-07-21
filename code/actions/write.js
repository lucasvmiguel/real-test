function validate(action){
	if (!action.selector) {
		return {error: true, message: 'missing field selector in action write or in an imported test'};
	}
	if (!action.value) {
		return {error: true, message: 'missing field value in action write or in an imported test'};
	}
	if (action.required === undefined) {
		return {error: true, message: 'missing field required in action write or in an imported test, please set required true or false'};
	}
	return {error: false};
}

export default function write(action){
	var result = validate(action);
	if (result.error) {
		return result;
	}

	if(!action.timeout) action.timeout = 1;

	if(action.required){
		return `			browser.waitForElementVisible('${action.selector}', ${action.timeout}, true, function(){
				this.setValue('${action.selector}', '${action.value}');
			});`;
	}else{
		return `			browser.pause(${action.timeout});
			browser.execute(elementIsExists, ['${action.selector}'], function(result){
				if(result.value)
					this.setValue('${action.selector}', '${action.value}');
			})`;
	}
}
