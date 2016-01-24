import fs from 'fs';
import {transpileHeader, transpileActions, transpileFooter} from './transpiler';
import colors from 'colors/safe';

function removeOldTests(config){
	fs.readdir(config.destPath,function(err,files){
		if (err) throw err;
		for(let i = 0; i < files.length; i++){
			fs.unlink(`${config.destPath}/${files[i]}`);
		}

		console.log('>Old tags removed\n');
	});
}

function writeNewTests(config){

	fs.readdir(config.originPath,function(err,files){
		if (err) throw err;

		console.log('>Available tags:\n');
		for(let i = 0; i < files.length; i++){
			fs.readFile(config.originPath + files[i], config.format,function(err,file){

				let actions;

				try{
					actions = JSON.parse(file);
					writeFile(files[i], actions, config);
				}catch(e){
					console.log(colors.red(`ERROR: Invalid json in ${config.originPath + files[i]}: ${e.message}\n\n`));
					process.exit();
				}
			});
		}
	});
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
