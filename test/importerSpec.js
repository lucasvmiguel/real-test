var importer = require('../bin/importer');
var assert = require('assert');

describe('Importer', function() {
  it('should getTestByName', function () {
    var test1 = [{title: 'test1'}, {action: 'write'}];
    var test2 = [{title: 'test2'}, {action: 'write'}];

    assert.deepEqual(importer.getTestByName({name: 'test1', tests: [test1, test2]}), test1);
    assert.deepEqual(importer.getTestByName({name: 'test2', tests: [test1, test2]}), test2);
    assert.deepEqual(importer.getTestByName({name: 'test3', tests: [test1, test2]}), []);
  });

  it('should getIndexTestByName', function () {
    var test1 = [{title: 'test1'}, {action: 'import', value: 'testx'}];
    var test2 = [{title: 'test2'}, {action: 'write'}, {action: 'import', value: 'testx'}];

    assert.equal(importer.getIndexTestByName({name: 'testx', test: test1}), 1);
    assert.equal(importer.getIndexTestByName({name: 'testx', test: test2}), 2);
    assert.equal(importer.getIndexTestByName({name: 'test3', test: test1}), undefined);
  });

  it('should removeIndexTestByName', function () {
    var test1 = [{title: 'test1'}, {action: 'import', value: 'testx'}];
    var test2 = [{title: 'test2'}, {action: 'write'}, {action: 'import', value: 'testx'}];

    assert.deepEqual(importer.removeIndexTestByName({name: 'testx', test: test1}), [{title: 'test1'}]);
    assert.deepEqual(importer.removeIndexTestByName({name: 'testx', test: test2}), [{title: 'test2'}, {action: 'write'}]);
    assert.deepEqual(importer.removeIndexTestByName({name: 'test3', test: test1}), test1);
  });
});
