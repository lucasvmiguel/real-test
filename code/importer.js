import R from 'ramda';
import colors from 'colors';

export function importTests(tests){

	try{
		for(let i = 0; i < R.length(tests); i++){
			for(let j = 0; j < R.length(tests[i]); j++){
				if(R.propEq('action', 'import', tests[i][j])){
					//get the test to import
					let importedAction = getTestByName({name: tests[i][j].value, tests: tests});

					//remove the title of action
					let removeTitleTest = importedAction.removeFirst();

					//get position to insert the import test inside the test
					let index = getIndexTestByName({name: tests[i][j].value, test: tests[i]});

					//insert the test
					let testImported = R.insertAll(index, importedAction, tests[i]);

					//remove the import action
					let testWithoutImport = removeIndexTestByName({name: tests[i][j].value, test: testImported});

					tests[i] = testWithoutImport;

					//recursive!!! =)
					importTests(tests);
				}
			}
		}
		return tests;

	}catch(e){
		console.log(colors.red('Error: cant import tests. ' + e));
		process.exit();
	}
}

export function getTestByName({name, tests}){
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

export function getIndexTestByName({name, test}){
	for(let i = 0; i < R.length(test); i++){
		if(test[i].action === 'import' && test[i].value === name) return i;
	}
}

export function removeIndexTestByName({name, test}){
	for(let i = 0; i < R.length(test); i++){
		if(test[i].action === 'import' && test[i].value === name)	test.splice(i, 1);
	}
	return test;
}

Array.prototype.removeFirst = function(){
  this.splice(0, 1)
	return this;
};
