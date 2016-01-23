import {replaceVariables} from '../lib/transpiler';
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
});
