export default function cookie(action){

  switch(action.type){
    case 'write':
      return `      browser.setCookie({
        name: '${action.name}',
        value: '${action.value}'
      });
      `;
    case 'assert':
      return `      browser.getCookie('${action.name}', function(result){
        this.assert.equal(result.value, '${action.value}');
      });
      `;
  }
}
