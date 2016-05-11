#!/usr/bin/env node
'use strict';

var _cli = require('./cli');

var cli = _interopRequireWildcard(_cli);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var CMD_TESTS = 'cd ' + __dirname + ' && cd .. && nightwatch';
var CMD_HIDDEN_TESTS = 'cd ' + __dirname + ' && cd .. && xvfb-run nightwatch';
var CMD_TEST = 'cd ' + __dirname + ' && cd .. && nightwatch -- --tag ';
var CMD_HIDDEN_TEST = 'cd ' + __dirname + ' && cd .. && xvfb-run nightwatch -- --tag ';

cli.start(CMD_TESTS, CMD_HIDDEN_TESTS, CMD_TEST, CMD_HIDDEN_TEST);