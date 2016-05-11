'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.boot = boot;

var _io = require('./io');

var io = _interopRequireWildcard(_io);

var _importer = require('./importer');

var importer = _interopRequireWildcard(_importer);

var _transpiler = require('./transpiler');

var transpiler = _interopRequireWildcard(_transpiler);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function boot(config) {

	//create folder
	io.createFolder(__dirname + '/tests_written');

	//delete all tests
	io.deleteFiles(__dirname + '/tests_written/**/*.js');

	//get all tests
	var tests = io.readFiles(config.path + '/**/*.json');

	//get all tests names
	var nameFiles = io.readNameFiles(config.path + '/**/*.json');

	//assoc names with tests
	var namedTests = tests.map(function (test, i) {
		return test.insert(0, { title: nameFiles[i] });
	});

	//import tests inside tests
	var importedTests = importer.importTests(namedTests);

	//write tests
	writeTests(config, importedTests);
}

function writeTests(config, tests) {
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = tests[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var test = _step.value;

			var fileStr = '';

			if (!transpiler.shouldTranspileTest(test, config)) {
				continue;
			}

			fileStr += transpiler.header(test[0].title);
			fileStr += transpiler.actions(test, config);
			fileStr += transpiler.footer(test);

			io.createFile(__dirname + '/tests_written/' + test[0].title + '.js', fileStr);
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
}

Array.prototype.insert = function (index, item) {
	this.splice(index, 0, item);
	return this;
};