import read from 'read-file';

import {boot} from './lib/boot';

const FILE_CONFIG = process.env.npm_config_CONFIG || 'default';

try{
  var config = JSON.parse(read.sync(`configs/${FILE_CONFIG}.json`, 'utf8'));
  console.log(`>Config file: ${FILE_CONFIG}.json\n`);
}catch(e){
  console.log(colors.red('Error: cant read config file. ' + e));
  process.exit()
}

boot(config);
