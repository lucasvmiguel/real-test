'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _boot = require('./boot');

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function executeCmd(error, stdout, stderr) {
  if (error) {
    console.log(_colors2.default.red('Error: cant run the tests. ' + error));
  } else {
    console.log('Running tests...');
    console.log(stdout);
  }
}

function runConfig(cmdWithoutHidden, cmdWithHidden, cmdOnlyOne, cmdHiddenOnlyOne) {
  try {
    var config = JSON.parse(_fs2.default.readFileSync(_commander2.default.config, 'utf8'));
    console.log('>Config file: ' + _commander2.default.config + '\n');
    (0, _boot.boot)(config);

    if (_commander2.default.omit && _commander2.default.test) {
      _shelljs2.default.exec(cmdHiddenOnlyOne + _commander2.default.test, executeCmd);
    } else if (_commander2.default.omit && !_commander2.default.test) {
      _shelljs2.default.exec(cmdWithHidden, executeCmd);
    } else if (!_commander2.default.omit && _commander2.default.test) {
      _shelljs2.default.exec(cmdHiddenOnlyOne + _commander2.default.test, executeCmd);
    } else if (!_commander2.default.omit && !_commander2.default.test) {
      _shelljs2.default.exec(cmdWithoutHidden, executeCmd);
    } else {
      _shelljs2.default.exec(cmdWithoutHidden, executeCmd);
    }
  } catch (e) {
    console.log(_colors2.default.red('Error: cant read config file. ' + e));
    process.exit();
  }
}

function start(cmd1, cmd2, cmd3, cmd4) {
  _commander2.default.version('0.7.2').option('-c, --config <config>', 'read config file').option('-o, --omit', 'omit browser window(real-test needs xvfb)').option('-t, --test <test>', 'only runs on test').parse(process.argv);

  if (_commander2.default.config) {
    runConfig(cmd1, cmd2);
  } else {
    console.log(_colors2.default.red('You need set one config file. Try something like this:'));
    console.log('$ real-test -c /home/user/documents/configs/config.json');
  }
}