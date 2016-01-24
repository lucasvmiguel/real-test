export default function assert(action){
  if(!action.timeout) action.timeout = 1;

  switch(action.type){
    case 'urlEquals':
      return `      browser.waitForElementPresent('body', ${action.timeout}, function(){
        browser.assert.urlEquals('${action.value}');
      });
      `;
    case 'urlContains':
      return `      browser.waitForElementPresent('body', ${action.timeout}, function(){
        browser.assert.urlContains('${action.value}');
      });
      `;
    case 'elemExists':
      return `      browser.waitForElementPresent('body', ${action.timeout}, function(){
        browser.assert.elementPresent('${action.selector}');
      });
      `;
    case 'elemNotExists':
      return `      browser.waitForElementPresent('body', ${action.timeout}, function(){
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
