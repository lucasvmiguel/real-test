import {getTestByName, getIndexTestByName, removeIndexTestByName} from '../code/importer';
import assert from 'assert';

describe('Importer', function() {
  it('should getTestByName', function () {
    const test1 = [{title: 'test1'}, {action: 'write'}];
    const test2 = [{title: 'test2'}, {action: 'write'}];

    assert.deepEqual(getTestByName({name: 'test1', tests: [test1, test2]}), test1);
    assert.deepEqual(getTestByName({name: 'test2', tests: [test1, test2]}), test2);
    assert.deepEqual(getTestByName({name: 'test3', tests: [test1, test2]}), []);
  });

  it('should getIndexTestByName', function () {
    const test1 = [{title: 'test1'}, {action: 'import', value: 'testx'}];
    const test2 = [{title: 'test2'}, {action: 'write'}, {action: 'import', value: 'testx'}];

    assert.equal(getIndexTestByName({name: 'testx', test: test1}), 1);
    assert.equal(getIndexTestByName({name: 'testx', test: test2}), 2);
    assert.equal(getIndexTestByName({name: 'test3', test: test1}), undefined);
  });

  it('should removeIndexTestByName', function () {
    const test1 = [{title: 'test1'}, {action: 'import', value: 'testx'}];
    const test2 = [{title: 'test2'}, {action: 'write'}, {action: 'import', value: 'testx'}];

    assert.deepEqual(removeIndexTestByName({name: 'testx', test: test1}), [{title: 'test1'}]);
    assert.deepEqual(removeIndexTestByName({name: 'testx', test: test2}), [{title: 'test2'}, {action: 'write'}]);
    assert.deepEqual(removeIndexTestByName({name: 'test3', test: test1}), test1);
  });
});
