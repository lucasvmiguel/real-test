import colors from 'colors/safe';
import glob from 'glob';
import R from 'ramda';
import fs from 'fs';

export function createFolder(nameFolder){
  if (!fs.existsSync(nameFolder)){
    return fs.mkdirSync(nameFolder);
  }
}

export function createFile(filename, body){
  try{
    return fs.writeFile(filename, body, () => console.log('FILE CREATED: ', filename));
  }catch(e){
    console.log(colors.red('Error: cant create name file. ' + e));
    process.exit();
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
    process.exit();
  }
}

export function readFiles(dirname){
  try{
    return R.compose(
      R.map((file) => {
        try{
          let json = JSON.parse(file);
          return json;
        }catch(e){
          console.log(colors.red('Error: cant read file. ' + e));
          process.exit();
        }
      }),
      R.map(fs.readFileSync),
      glob.sync
    )(dirname);
  }catch(e){
    console.log(colors.red('Error: cant read files. ' + e));
    process.exit();
  }
}

export function deleteFiles(dirname){
  try{
    return R.compose(
      R.map(fs.unlinkSync),
      glob.sync
    )(dirname);
  }catch(e){
    console.log(colors.red('Error: cant delete files. ' + e));
    process.exit();
  }
}
