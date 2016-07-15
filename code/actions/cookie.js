function validate(action){
  if (!action.name) {
		return {error: true, message: 'missing field name in action cookie or in an imported test'};
	}
	if (!action.value) {
		return {error: true, message: 'missing field value in action cookie or in an imported test'};
	}
  if (action.type !== 'write') {
		return {error: true, message: 'invalid field type in action cookie or in an imported test, options available: write'};
	}

	return {error: false};
}

export default function cookie(action){
  var result = validate(action);
	if (result.error) {
		return result;
	}

  switch(action.type){
    case 'write':
      return `      browser.setCookie({
        name: '${action.name}',
        value: '${action.value}'
      });
      `;
  }
}
