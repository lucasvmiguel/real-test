#!/usr/bin/env node
'use strict';

var _cli = require('./cli');

var cli = _interopRequireWildcard(_cli);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var CMD_TESTS = 'nightwatch';
var CMD_HIDDEN_TESTS = 'xvfb-run nightwatch';

cli.start(CMD_TESTS, CMD_HIDDEN_TESTS);