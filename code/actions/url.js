function validate(action){
	if (!action.value) {
		return {error: true, message: 'missing field value in action url or in an imported test'};
	}
	return {error: false};
}

export default function url(action){
	var result = validate(action);
	if (result.error) {
		return result;
	}

	return `			browser.url("${action.value}");`;
}
