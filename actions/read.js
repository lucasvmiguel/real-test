export default function read(action){
	if(action.required){
		return `			browser.waitForElementVisible('${action.selector}', ${action.timeout}, true, function(){
				this.assert.containsText('${action.selector}', '${action.value}');
			});`;
	}else{
		return `			browser.pause(${action.timeout});
			browser.execute(elementIsExists, ['${action.selector}'], function(result){
				if(result.value)
					this.assert.containsText('${action.selector}', '${action.value}');
			});`;
	}
}
