import glob from 'glob';
import R from 'ramda';
import fs from 'fs';


export function createFile(filename, body){
  fs.writeFile(filename, body, () => console.log('FILE CREATED: ', filename));
}

export function readNameFiles(dirname){
  return R.compose(
    R.map((filepath) => filepath.match(/(?:.*\/)*(.*?)\.json/)[1]),
    glob.sync
  )(dirname);
}

export function readFiles(dirname){
  return R.compose(
    R.map(JSON.parse),
    R.map(fs.readFileSync),
    glob.sync
  )(dirname);
}

export function deleteFiles(dirname){
  R.compose(
    R.map(fs.unlinkSync),
    glob.sync
  )(dirname);
}
