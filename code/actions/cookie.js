export default function cookie(action){

  switch(action.type){
    case 'write':
      return `      browser.setCookie({
        name: '${action.name}',
        value: '${action.value}'
      });
      `;
  }
}
