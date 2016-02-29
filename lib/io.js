import colors from 'colors/safe';
import glob from 'glob';
import R from 'ramda';
import fs from 'fs';


export function createFile(filename, body){
  try{
    fs.writeFile(filename, body, () => console.log('FILE CREATED: ', filename));
  }catch(e){
    console.log(colors.red('Error: cant create name file. ' + e));
  }
}

export function readNameFiles(dirname){
  try{
    return R.compose(
      R.map((filepath) => filepath.match(/(?:.*\/)*(.*?)\.json/)[1]),
      glob.sync
    )(dirname);
  }catch(e){
    console.log(colors.red('Error: cant read name files. ' + e));
  }
}

export function readFiles(dirname){
  try{
    return R.compose(
      R.map(JSON.parse),
      R.map(fs.readFileSync),
      glob.sync
    )(dirname);
  }catch(e){
    console.log(colors.red('Error: cant read files. ' + e));
  }
}

export function deleteFiles(dirname){
  try{
    R.compose(
      R.map(fs.unlinkSync),
      glob.sync
    )(dirname);
  }catch(e){
    console.log(colors.red('Error: cant delete files. ' + e));
  }
}
