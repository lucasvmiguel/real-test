var transpiler = require('../bin/transpiler');
var assert = require('assert');

describe('Transpiler', function() {
	it('should replaceVariables', function () {
    var action1 = {value: '!!abc', timeout: '!!efg'};
    var action2 = {timeout: '!!efg'};
    var action3 = {value: '!!abc'};
    var action4 = {};

    var config1 = {variables:{abc: 'trocou abc', efg: 'trocou efg'}};
    var config2 = {variables:{abc: 'trocou abc'}};
    var config3 = {variables:{efg: 'trocou efg'}};
    var config4 = {variables:{}};

    assert.deepEqual(transpiler.replaceVariables(action1, config1), {value: 'trocou abc', timeout: 'trocou efg'});
    assert.deepEqual(transpiler.replaceVariables(action2, config1), {timeout: 'trocou efg'});
    assert.deepEqual(transpiler.replaceVariables(action3, config1), {value: 'trocou abc'});
    assert.deepEqual(transpiler.replaceVariables(action4, config1), {});

    assert.deepEqual(transpiler.replaceVariables(action1, config2), {value: 'trocou abc', timeout: '!!efg'});
    assert.deepEqual(transpiler.replaceVariables(action1, config3), {value: '!!abc', timeout: 'trocou efg'});
    assert.deepEqual(transpiler.replaceVariables(action1, config4), {value: '!!abc', timeout: '!!efg'});
	});

	it('should shouldTranspileTest', function () {
		var config1 = {name: 'test'};
		var config2 = {};

		var test1 = [{title: 'action1'}, {action: 'write'}];
		var test2 = [{title: 'action2'}, {type: 'helper'}];
		var test3 = [{title: 'action3'}, {only: 'test'}];
		var test4 = [{title: 'action4'}, {notOnly: 'test'}];
		var test5 = [];

		assert.equal(transpiler.shouldTranspileTest(test1, config1), true);
		assert.equal(transpiler.shouldTranspileTest(test2, config1), false);
		assert.equal(transpiler.shouldTranspileTest(test3, config1), true);
		assert.equal(transpiler.shouldTranspileTest(test4, config1), false);
		assert.equal(transpiler.shouldTranspileTest(test5, config1), false);

		assert.equal(transpiler.shouldTranspileTest(test1, config2), false);
		assert.equal(transpiler.shouldTranspileTest(test2, config2), false);
		assert.equal(transpiler.shouldTranspileTest(test3, config2), false);
		assert.equal(transpiler.shouldTranspileTest(test4, config2), false);
		assert.equal(transpiler.shouldTranspileTest(test5, config2), false);
	});
});
