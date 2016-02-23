import fs from 'fs';
import glob from 'glob';
import colors from 'colors/safe';
import R from 'ramda';

import removeOldTests from './clean';
import {transpileHeader, transpileActions, transpileFooter} from './transpiler';

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

function importTests(actions){

	R.map((action, x) => {
		if(R.propEq('action', 'import', action)){
			console.log(x);
			const importedAction = getActionByName(R.prop('value', action), actions);
			const importedActionClean = R.remove(0, 1, importedAction);
			const newActions = R.insertAll(Number(j), importedActionClean, y);
			importTests(newActions);
		}
	})(actions);

	return actions;
}

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
	removeOldTests(config);
	writeNewTests(config);
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

function writeFile(nameFile, actions, config){
	const nameTag = nameFile.replace(/\.json/g, '');
	let fileStr = '';

	nameFile = nameFile.replace(/json/g, 'js');

	if(!shouldTranspileTest(actions, config)){
		return;
	}

	fileStr += transpileHeader(nameTag);
  fileStr += transpileActions(actions, config);
	fileStr += transpileFooter(actions);

	fs.writeFile(`${config.destPath}/${nameFile}`, fileStr, function () {
  		console.log(`-${nameTag}`);
	});
}
