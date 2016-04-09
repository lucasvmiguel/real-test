export default function pause(action){
	if(!action.value)
		return `			browser.pause(100);`;
	return `			browser.pause(${action.value});`;
}
