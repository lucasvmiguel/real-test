export default function write(action){

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
