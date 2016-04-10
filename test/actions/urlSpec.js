var url = require('../../bin/actions/url');
var assert = require('assert');

describe('Actions', function() {
	it('should transpile url method', function () {
		var config1 = {url:{default: '', prefix: '', sufix: ''}};
		var config2 = {url:{}};
		var config3 = {url:{default: 'amazon.com.br', prefix: 'test.', sufix: '/test'}};
		var config4 = {url:{default: '', prefix: 'test.', sufix: '/test'}};
		var config5 = {url:{default: 'amazon.com.br', prefix: '', sufix: '/test'}};
		var config6 = {url:{default: 'amazon.com.br', prefix: 'test.', sufix: ''}};
		var config7 = {url:{default: 'amazon.com.br', prefix: '', sufix: ''}};
		var config8 = {url:{default: '', prefix: 'test.', sufix: ''}};
		var config9 = {url:{default: '', prefix: '', sufix: '/test'}};

		var action1 = {value: 'xxx'};
		var action2 = {value: ''};

		assert.equal(url.default(action1, config1), '\t\t\tbrowser.url("xxx");');
		assert.equal(url.default(action2, config1), '\t\t\tbrowser.url("");');
		assert.equal(url.default(action1, config2), '\t\t\tbrowser.url("xxx");');
		assert.equal(url.default(action1, config3), '\t\t\tbrowser.url("test.amazon.com.br/test");');
		assert.equal(url.default(action1, config4), '\t\t\tbrowser.url("test.xxx/test");');
		assert.equal(url.default(action1, config5), '\t\t\tbrowser.url("xxxamazon.com.br/test");');
		assert.equal(url.default(action1, config6), '\t\t\tbrowser.url("test.amazon.com.brxxx");');
		assert.equal(url.default(action1, config7), '\t\t\tbrowser.url("amazon.com.brxxx");');
		assert.equal(url.default(action1, config8), '\t\t\tbrowser.url("test.xxx");');
		assert.equal(url.default(action1, config9), '\t\t\tbrowser.url("xxx/test");');
		assert.equal(url.default(action2, config9), '\t\t\tbrowser.url("/test");');
	});
});
