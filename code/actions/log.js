function validate(action){
	if (!action.value) {
		return {error: true, message: 'missing field value in action log or in an imported test'};
	}
	return {error: false};
}

export default function log(action){
	var result = validate(action);
	if (result.error) {
		return result;
	}

	return `			console.log(${action.value});`;
}
