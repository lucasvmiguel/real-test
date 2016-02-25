import read from 'read-file';
import colors from 'colors/safe';

import {boot} from './lib/boot';

const FILE_CONFIG = process.env.npm_config_CONFIG || 'default';

var config = JSON.parse(read.sync(`configs/${FILE_CONFIG}.json`, 'utf8'));
console.log(`>Config file: ${FILE_CONFIG}.json\n`);
boot(config);
