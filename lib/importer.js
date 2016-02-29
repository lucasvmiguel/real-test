import R from 'ramda';

export function importTests(tests){

	try{
		for(let i = 0; i < R.length(tests); i++){
			for(let j = 0; j < R.length(tests[i]); j++){
				if(R.propEq('action', 'import', tests[i][j])){
					let importedAction = getTestByName(tests[i][j].value, tests);

					let removeTitleTest = importedAction.removeFirst();

					let index = getIndexTestByName(tests[i][j].value, tests[i]);

					let testImported = R.insertAll(index, importedAction, tests[i]);

					let testWithoutImport = removeIndexTestByName(tests[i][j].value, testImported);

					tests[i] = testWithoutImport;
					importTests(tests);
				}
			}
		}
		return tests;

	}catch(e){
		console.log(colors.red('Error: cant import tests. ' + e));
	}
}

function getTestByName(name, tests){
	return R.compose(
			R.filter((v) => v !== undefined),
			R.flatten,
			R.map((test) => {
				for(let action of test){
					if(action.title === name) return test;
				}
			}
		))(tests);
}

function getIndexTestByName(name, test){
	for(let i = 0; i < R.length(test); i++){
		if(test[i].action === 'import' && test[i].value === name) return i;
	}
}

function removeIndexTestByName(name, test){
	for(let i = 0; i < R.length(test); i++){
		if(test[i].action === 'import' && test[i].value === name)	test.splice(i, 1);
	}
	return test;
}

Array.prototype.removeFirst = function(){
  this.splice(0, 1)
	return this;
};
