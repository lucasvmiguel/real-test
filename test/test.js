import {url, phone, desktop, pause} from '../lib/transpiler';
import assert from 'assert';

describe('Transpiler', function() {
	it.skip('should transpile url method', function () {
		let action = {value: 'http://google.com'};
		assert.equal(url(action), '\t\t\tbrowser.url("http://google.com");');
	});

	it('should transpile phone method', function () {
		let action = {action: 'mobile'};
		assert.equal(phone(action), '\t\t\tbrowser.resizeWindow(360, 567);');
	});

	it('should transpile desktop method', function () {
		let action = {action: 'desktop'};
		assert.equal(desktop(action), '\t\t\tbrowser.resizeWindow(1000, 800);');
	});

	it('should transpile pause method', function () {
		let action1 = {action: 'pause', value: '1000'};
		let action2 = {action: 'pause', value: undefined};


		assert.equal(pause(action1), '\t\t\tbrowser.pause(1000);');
		assert.equal(pause(action2), '\t\t\tbrowser.pause(100);');
	});
});
