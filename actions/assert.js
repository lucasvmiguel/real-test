export default function assert(action){
  if(!action.timeout) action.timeout = 1;

  switch(action.type){
    case 'urlEquals':
      return `      browser.waitForElementPresent('body', ${action.timeout}, function(){
        browser.assert.urlEquals('${action.value}');
      });
      `;
      break;
    case 'urlContains':
      return `      browser.waitForElementPresent('body', ${action.timeout}, function(){
        browser.assert.urlContains('${action.value}');
      });
      `;
      break;
  }
}
