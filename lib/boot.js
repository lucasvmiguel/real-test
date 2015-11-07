import fs from 'fs';
import {transpileHeader, transpileActions, transpileFooter} from './transpiler';

function removeOldTests(config){
	fs.readdir(config.destPath,function(err,files){
		if (err) throw err;
		for(let i = 0; i < files.length; i++){
			fs.unlink(`${config.destPath}/${files[i]}`);
		}

		console.log('>Tags antigas removidas\n');
	});
}

function writeNewTests(config){

	fs.readdir(config.originPath,function(err,files){
		if (err) throw err;

		console.log('>Tags disponíveis:\n');
		for(let i = 0; i < files.length; i++){
			fs.readFile(config.originPath + files[i], config.format,function(err,file){
				let actions = JSON.parse(file);
				writeFile(files[i], actions, config);
			});
		}
	});
}

export function boot(config){
	removeOldTests(config);
	writeNewTests(config);
}

function writeFile(nameFile, actions, config){
	const nameTag = nameFile.replace(/\.json/g, '');
	let fileStr = '';

	nameFile = nameFile.replace(/json/g, 'js');

	fileStr += transpileHeader(nameTag);
  fileStr += transpileActions(actions, config);
	fileStr += transpileFooter(actions);

	fs.writeFile(`${config.destPath}/${nameFile}`, fileStr, function () {
  		console.log(`-${nameTag}`);
	});
}
