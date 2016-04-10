#!/usr/bin/env node

import * as cli from './cli';

const CMD_TESTS = 'nightwatch';
const CMD_HIDDEN_TESTS = 'xvfb-run nightwatch';
const CMD_TEST = 'nightwatch -- --tag ';
const CMD_HIDDEN_TEST = 'xvfb-run nightwatch -- --tag ';

cli.start(CMD_TESTS, CMD_HIDDEN_TESTS, CMD_TEST, CMD_HIDDEN_TEST);
