#!/usr/bin/env node

import * as cli from './cli';

const CMD_TESTS = 'nightwatch';
const CMD_HIDDEN_TESTS = 'xvfb-run nightwatch';

cli.start(CMD_TESTS, CMD_HIDDEN_TESTS);
