import fs from 'fs';
import glob from 'glob';
import colors from 'colors/safe';
import R from 'ramda';

import * as io from './io';
import * as importer from './importer';
import * as transpiler from './transpiler';

export function boot(config){

	//delete all tests
	io.deleteFiles(config.destPath + '**/*.js');

	//get all tests
	let tests = io.readFiles(config.originPath + '**/*.json');

	//get all tests names
	let nameFiles = io.readNameFiles(config.originPath + '**/*.json');

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

		if(!shouldTranspileTest(test, config)){
			return;
		}

		fileStr += transpiler.header(test[0].title);
	  fileStr += transpiler.actions(test, config);
		fileStr += transpiler.footer(test);

		io.createFile(`${config.destPath}${test[0].title}.js`, fileStr);
	}
}

export function shouldTranspileTest(actions, config){
	if(!config.name) return false;
	if(!actions.length) return false;
	if(actions[0].action !== 'header') return true;

	if(!!actions[0].only){
		if(actions[0].only === config.name)
			return true;
		else
			return false;
	}

	if(!!actions[0].notOnly){
		if(actions[0].notOnly !== config.name)
			return true;
		else
			return false;
	}

	return true;
}

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
	return this;
};
