import colors from 'colors';
import R from 'ramda';

import * as io from './io';
import * as importer from './importer';
import * as transpiler from './transpiler';

export function boot(config){

	//create folder
	io.createFolder(__dirname + '/tests_written');

	//delete all tests
	io.deleteFiles(__dirname + '/tests_written/**/*.js');

	//get all tests
	let tests = io.readFiles(config.path + '/**/*.json');

	if (R.isEmpty(tests)) {
		console.log(colors.red('Error: there are no tests in this folder: ' + config.path));
		process.exit();
	}

	//get all tests names
	let nameFiles = io.readNameFiles(config.path + '/**/*.json');

	//assoc names with tests
	let namedTests = tests.map((test, i) => test.insert(0, {title: nameFiles[i]}) );

	//import tests inside tests
	const importedTests = importer.importTests(namedTests);

	//write tests
	writeTests(config, importedTests);
}

function writeTests(config, tests){
	for(let test of tests){
		let fileStr = '';

		if(R.length(test) < 2 || !transpiler.shouldTranspileTest(test, config)){
			continue;
		}

		fileStr += transpiler.header(test[0].title);
		let compiledActions = transpiler.actions(test, config);

		if (compiledActions.error) {
			console.log(colors.red('Error: cant run test: ' + test[0].title));
			console.log(colors.red('Error: ' + compiledActions.message));
			process.exit();
		}

	  fileStr += compiledActions;
		fileStr += transpiler.footer(test);

		io.createFile(`${__dirname}/tests_written/${test[0].title}.js`, fileStr);
	}
}

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
	return this;
};
