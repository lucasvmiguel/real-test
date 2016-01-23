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
  }
}
