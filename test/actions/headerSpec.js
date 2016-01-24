import {shouldTranspileTest} from '../../lib/boot';
import assert from 'assert';

describe('Actions', function() {
	it('should transpile test', function () {
		const config1 = {name: 'amazon'};
    const config2 = {};

		const actions1 = [{action: 'header', only: 'amazon'}];
    const actions2 = [{action: 'header', only: 'xx'}];
    const actions3 = [{action: 'header', notOnly: 'amazon'}];
    const actions4 = [{action: 'header', notOnly: 'xx'}];
    const actions5 = [];

		assert.equal(shouldTranspileTest(actions1, config1), true);
    assert.equal(shouldTranspileTest(actions2, config1), false);
    assert.equal(shouldTranspileTest(actions3, config1), false);
    assert.equal(shouldTranspileTest(actions4, config1), true);
    assert.equal(shouldTranspileTest(actions5, config1), false);

    assert.equal(shouldTranspileTest(actions1, config2), false);
    assert.equal(shouldTranspileTest(actions2, config2), false);
    assert.equal(shouldTranspileTest(actions3, config2), false);
    assert.equal(shouldTranspileTest(actions4, config2), false);
    assert.equal(shouldTranspileTest(actions5, config2), false);
	});
});
