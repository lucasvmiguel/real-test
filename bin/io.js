'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFolder = createFolder;
exports.createFile = createFile;
exports.readNameFiles = readNameFiles;
exports.readFiles = readFiles;
exports.deleteFiles = deleteFiles;
exports.hasFiles = hasFiles;

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFolder(nameFolder) {
  if (!_fs2.default.existsSync(nameFolder)) {
    return _fs2.default.mkdirSync(nameFolder);
  }
}

function createFile(filename, body) {
  try {
    return _fs2.default.writeFile(filename, body, function () {
      return console.log('FILE CREATED: ', filename);
    });
  } catch (e) {
    console.log(_safe2.default.red('Error: cant create name file. ' + e));
    process.exit();
  }
}

function readNameFiles(dirname) {
  try {
    return _ramda2.default.compose(_ramda2.default.map(function (filepath) {
      return filepath.match(/(?:.*\/)*(.*?)\.json/)[1];
    }), _glob2.default.sync)(dirname);
  } catch (e) {
    console.log(_safe2.default.red('Error: cant read name files. ' + e));
    process.exit();
  }
}

function readFiles(dirname) {
  try {
    return _ramda2.default.compose(_ramda2.default.map(function (file) {
      try {
        var json = JSON.parse(file);
        return json;
      } catch (e) {
        console.log(_safe2.default.red('Error: cant read file. ' + e));
        process.exit();
      }
    }), _ramda2.default.map(_fs2.default.readFileSync), _glob2.default.sync)(dirname);
  } catch (e) {
    console.log(_safe2.default.red('Error: cant read files. ' + e));
    process.exit();
  }
}

function deleteFiles(dirname) {
  try {
    return _ramda2.default.compose(_ramda2.default.map(_fs2.default.unlinkSync), _glob2.default.sync)(dirname);
  } catch (e) {
    console.log(_safe2.default.red('Error: cant delete files. ' + e));
    process.exit();
  }
}

function hasFiles(dirname) {
  return !_ramda2.default.isEmpty(_glob2.default.sync(dirname));
}