import url from '../../code/actions/url';
import assert from 'assert';

describe('Actions', function() {
	it('should transpile url method', function () {
		const config1 = {url:{default: '', prefix: '', sufix: ''}};
		const config2 = {url:{}};
		const config3 = {url:{default: 'amazon.com.br', prefix: 'test.', sufix: '/test'}};
		const config4 = {url:{default: '', prefix: 'test.', sufix: '/test'}};
		const config5 = {url:{default: 'amazon.com.br', prefix: '', sufix: '/test'}};
		const config6 = {url:{default: 'amazon.com.br', prefix: 'test.', sufix: ''}};
		const config7 = {url:{default: 'amazon.com.br', prefix: '', sufix: ''}};
		const config8 = {url:{default: '', prefix: 'test.', sufix: ''}};
		const config9 = {url:{default: '', prefix: '', sufix: '/test'}};

		const action1 = {value: 'xxx'};
		const action2 = {value: ''};

		assert.equal(url(action1, config1), '\t\t\tbrowser.url("xxx");');
		assert.equal(url(action2, config1), '\t\t\tbrowser.url("");');
		assert.equal(url(action1, config2), '\t\t\tbrowser.url("xxx");');
		assert.equal(url(action1, config3), '\t\t\tbrowser.url("test.amazon.com.br/test");');
		assert.equal(url(action1, config4), '\t\t\tbrowser.url("test.xxx/test");');
		assert.equal(url(action1, config5), '\t\t\tbrowser.url("xxxamazon.com.br/test");');
		assert.equal(url(action1, config6), '\t\t\tbrowser.url("test.amazon.com.brxxx");');
		assert.equal(url(action1, config7), '\t\t\tbrowser.url("amazon.com.brxxx");');
		assert.equal(url(action1, config8), '\t\t\tbrowser.url("test.xxx");');
		assert.equal(url(action1, config9), '\t\t\tbrowser.url("xxx/test");');
		assert.equal(url(action2, config9), '\t\t\tbrowser.url("/test");');
	});
});
