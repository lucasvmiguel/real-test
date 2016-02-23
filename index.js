import read from 'read-file';
import colors from 'colors/safe';

import {boot} from './lib/boot';

const FILE_CONFIG = process.env.npm_config_CONFIG || 'default';

try{
  var config = JSON.parse(read.sync(`configs/${FILE_CONFIG}.json`, 'utf8'));
  console.log(`>Config file: ${FILE_CONFIG}.json\n`);
  boot(config);
}catch(e){
  console.log(colors.red('ERROR: it was not possible compile the tests, we will run the last compiled tests.\n\n' + e));
}
