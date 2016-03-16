import * as io from './io';
import * as importer from './importer';
import * as transpiler from './transpiler';

export function boot(config){

	//create folder
	io.createFolder('tests_written');

	//delete all tests
	io.deleteFiles('./tests_written/**/*.js');

	//get all tests
	let tests = io.readFiles(config.path + '**/*.json');

	//get all tests names
	let nameFiles = io.readNameFiles(config.path + '**/*.json');

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

		if(!transpiler.shouldTranspileTest(test, config)){
			continue;
		}

		fileStr += transpiler.header(test[0].title);
	  fileStr += transpiler.actions(test, config);
		fileStr += transpiler.footer(test);

		io.createFile(`./tests_written/${test[0].title}.js`, fileStr);
	}
}

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
	return this;
};
