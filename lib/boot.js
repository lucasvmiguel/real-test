import fs from 'fs';
import glob from 'glob';
import colors from 'colors/safe';
import R from 'ramda';

import * as io from './io';
import * as importer from './importer';
import * as transpiler from './transpiler';

//+ getFilesActions : String<Path> => Array<FileAction>
function getFilesActions(path){
	return R.compose(
		R.map(R.compose(
			R.insert(0, {name: R.head(file.match(/[\w-]+\./g)).slice(0,-1)}),
			JSON.parse,
			fs.readFileSync,
		)),
		glob.sync
	)(path);
}

//P getActionByName : String<Name> => Array<FileAction> => Object<Action>
export const getActionByName = R.curry((name, actions) => {
	return R.map(
		R.find(R.propEq('name', name))
	)(actions);
});

function writeNewTests(config){

	const filesActions = getFilesActions(config.originPath + '**/*.json');

	//importTests(filesActions);

	// fs.readdir(config.originPath,function(err,files){
	// 	if (err) throw err;
	//
	// 	console.log('>Available tags:\n');
	// 	for(let i = 0; i < files.length; i++){
	// 		fs.readFile(config.originPath + files[i], config.format,function(err,file){
	//
	// 			let actions;
	//
	// 			try{
	// 				actions = JSON.parse(file);
	// 				writeFile(files[i], actions, config);
	// 			}catch(e){
	// 				console.log(colors.red(`ERROR: Invalid json in ${config.originPath + files[i]}: ${e.message}\n\n`));
	// 				process.exit();
	// 			}
	// 		});
	// 	}
	// });
}

export function boot(config){
	const dirnameOldTests = './tests_written/';

	io.deleteFiles(config.destPath + '**/*.js');

	//get all tests
	const tests = io.readFiles(config.originPath + '**/*.json');

	const testsName = io.readNameFiles(config.originPath + '**/*.json');

	//import tests inside tests
	//const importedTests = importer.importTests(tests);

	//write tests
	//writeNewTests(config);
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
