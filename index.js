import read from 'read-file';

import {boot} from './lib/boot';

var config = JSON.parse(read.sync('config.json', 'utf8'));

boot(config);
