#!/usr/bin/env node

import * as cli from './cli';

const CMD_TESTS = 'cd ' + __dirname + ' && cd .. && nightwatch';
const CMD_HIDDEN_TESTS = 'cd ' + __dirname + ' && cd .. && xvfb-run nightwatch';
const CMD_TEST = 'cd ' + __dirname + ' && cd .. && nightwatch -- --tag ';
const CMD_HIDDEN_TEST = 'cd ' + __dirname + ' && cd .. && xvfb-run nightwatch -- --tag ';

cli.start(CMD_TESTS, CMD_HIDDEN_TESTS, CMD_TEST, CMD_HIDDEN_TEST);
