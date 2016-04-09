'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.importTests = importTests;
exports.getTestByName = getTestByName;
exports.getIndexTestByName = getIndexTestByName;
exports.removeIndexTestByName = removeIndexTestByName;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function importTests(tests) {

	try {
		for (var i = 0; i < _ramda2.default.length(tests); i++) {
			for (var j = 0; j < _ramda2.default.length(tests[i]); j++) {
				if (_ramda2.default.propEq('action', 'import', tests[i][j])) {
					//get the test to import
					var importedAction = getTestByName({ name: tests[i][j].value, tests: tests });

					//remove the title of action
					var removeTitleTest = importedAction.removeFirst();

					//get position to insert the import test inside the test
					var index = getIndexTestByName({ name: tests[i][j].value, test: tests[i] });

					//insert the test
					var testImported = _ramda2.default.insertAll(index, importedAction, tests[i]);

					//remove the import action
					var testWithoutImport = removeIndexTestByName({ name: tests[i][j].value, test: testImported });

					tests[i] = testWithoutImport;

					//recursive!!! =)
					importTests(tests);
				}
			}
		}
		return tests;
	} catch (e) {
		console.log(colors.red('Error: cant import tests. ' + e));
		process.exit();
	}
}

function getTestByName(_ref) {
	var name = _ref.name;
	var tests = _ref.tests;

	return _ramda2.default.compose(_ramda2.default.filter(function (v) {
		return v !== undefined;
	}), _ramda2.default.flatten, _ramda2.default.map(function (test) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = test[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var action = _step.value;

				if (action.title === name) return test;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}))(tests);
}

function getIndexTestByName(_ref2) {
	var name = _ref2.name;
	var test = _ref2.test;

	for (var i = 0; i < _ramda2.default.length(test); i++) {
		if (test[i].action === 'import' && test[i].value === name) return i;
	}
}

function removeIndexTestByName(_ref3) {
	var name = _ref3.name;
	var test = _ref3.test;

	for (var i = 0; i < _ramda2.default.length(test); i++) {
		if (test[i].action === 'import' && test[i].value === name) test.splice(i, 1);
	}
	return test;
}

Array.prototype.removeFirst = function () {
	this.splice(0, 1);
	return this;
};