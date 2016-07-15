function validate(action){
	if (!action.type) {
		return {error: true, message: 'missing field type in action assert or in an imported test'};
	}
	if (!action.selector) {
		return {error: true, message: 'missing field selector in action assert or in an imported test'};
	}
  if (action.type !== 'urlEquals' && action.type !== 'urlContains' && action.type !== 'elemExists' && action.type !== 'elemNotExists' && action.type !== 'text') {
		return {error: true, message: 'invalid field type in test assert, options available: urlEquals | urlContains | elemExists | elemNotExists | text'};
	}
  if (action.type === 'text' && !action.value) {
    return {error: true, message: 'missing field value in test assert (only type text needs field value)'};
  }

	return {error: false};
}

export default function assert(action){
  var result = validate(action);
	if (result.error) {
		return result;
	}

  if(!action.timeout) action.timeout = 1;

  switch(action.type){
    case 'urlEquals':
      return `      browser.waitForElementPresent('${action.selector}', ${action.timeout}, function(){
        browser.assert.urlEquals('${action.value}');
      });
      `;
    case 'urlContains':
      return `      browser.waitForElementPresent('${action.selector}', ${action.timeout}, function(){
        browser.assert.urlContains('${action.value}');
      });
      `;
    case 'elemExists':
      return `      browser.waitForElementPresent('${action.selector}', ${action.timeout}, function(){
        browser.assert.elementPresent('${action.selector}');
      });
      `;
    case 'elemNotExists':
      return `      browser.waitForElementPresent('${action.selector}', ${action.timeout}, function(){
        browser.assert.elementNotPresent('${action.selector}');
      });
      `;
    case 'text':
      return `			browser.waitForElementPresent('${action.selector}', ${action.timeout}, true, function(){
          browser.getText('${action.selector}', function(result) {
            if(!!result.value && typeof result.value === 'string'){
              this.assert.equal(result.value.toLowerCase(), '${action.value.toLowerCase()}');
            }
          });
        });`;
  }
}
