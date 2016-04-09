import {replaceVariables, shouldTranspileTest} from '../code/transpiler';
import assert from 'assert';

describe('Transpiler', function() {
	it('should replaceVariables', function () {
    const action1 = {value: '!!abc', timeout: '!!efg'};
    const action2 = {timeout: '!!efg'};
    const action3 = {value: '!!abc'};
    const action4 = {};

    const config1 = {variables:{abc: 'trocou abc', efg: 'trocou efg'}};
    const config2 = {variables:{abc: 'trocou abc'}};
    const config3 = {variables:{efg: 'trocou efg'}};
    const config4 = {variables:{}};

    assert.deepEqual(replaceVariables(action1, config1), {value: 'trocou abc', timeout: 'trocou efg'});
    assert.deepEqual(replaceVariables(action2, config1), {timeout: 'trocou efg'});
    assert.deepEqual(replaceVariables(action3, config1), {value: 'trocou abc'});
    assert.deepEqual(replaceVariables(action4, config1), {});

    assert.deepEqual(replaceVariables(action1, config2), {value: 'trocou abc', timeout: '!!efg'});
    assert.deepEqual(replaceVariables(action1, config3), {value: '!!abc', timeout: 'trocou efg'});
    assert.deepEqual(replaceVariables(action1, config4), {value: '!!abc', timeout: '!!efg'});
	});

	it('should shouldTranspileTest', function () {
		const config1 = {name: 'test'};
		const config2 = {};

		const test1 = [{title: 'action1'}, {action: 'write'}];
		const test2 = [{title: 'action2'}, {type: 'helper'}];
		const test3 = [{title: 'action3'}, {only: 'test'}];
		const test4 = [{title: 'action4'}, {notOnly: 'test'}];
		const test5 = [];

		assert.equal(shouldTranspileTest(test1, config1), true);
		assert.equal(shouldTranspileTest(test2, config1), false);
		assert.equal(shouldTranspileTest(test3, config1), true);
		assert.equal(shouldTranspileTest(test4, config1), false);
		assert.equal(shouldTranspileTest(test5, config1), false);

		assert.equal(shouldTranspileTest(test1, config2), false);
		assert.equal(shouldTranspileTest(test2, config2), false);
		assert.equal(shouldTranspileTest(test3, config2), false);
		assert.equal(shouldTranspileTest(test4, config2), false);
		assert.equal(shouldTranspileTest(test5, config2), false);
	});
});
