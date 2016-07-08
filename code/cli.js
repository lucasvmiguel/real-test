import fs from 'fs';
import cli from 'commander';
import colors from 'colors';
import {boot} from './boot';
import sheel from 'shelljs';

function executeCmd(error, stdout, stderr){
  if(error){
    console.log(colors.red('Error: cant run the tests. ' + error));
  }else{
    console.log('Running tests...');
    console.log(stdout);
  }
}

function runConfig(cmdWithoutHidden, cmdWithHidden, cmdOnlyOne, cmdHiddenOnlyOne){
  try{
    var config = JSON.parse(fs.readFileSync(cli.config, 'utf8'));
    console.log(`>Config file: ${cli.config}\n`);
    boot(config);

    if(cli.omit && cli.test){
      sheel.exec(cmdHiddenOnlyOne + cli.test, executeCmd);
    }else if(cli.omit && !cli.test){
      sheel.exec(cmdWithHidden, executeCmd);
    }else if(!cli.omit && cli.test){
      sheel.exec(cmdHiddenOnlyOne + cli.test, executeCmd);
    }else if(!cli.omit && !cli.test){
      sheel.exec(cmdWithoutHidden, executeCmd);
    }else{
      sheel.exec(cmdWithoutHidden, executeCmd);
    }

  }catch(e){
    console.log(colors.red('Error: cant read config file. ' + e));
    process.exit()
  }
}

export function start(cmd1, cmd2, cmd3, cmd4){
  cli
    .version('0.7.2')
    .option('-c, --config <config>', 'read config file')
    .option('-o, --omit', 'omit browser window(real-test needs xvfb)')
    .option('-t, --test <test>', 'only runs on test')
    .parse(process.argv);

  if(cli.config){
    runConfig(cmd1, cmd2);
  }else{
    console.log(colors.red('You need set one config file. Try something like this:'));
    console.log('$ real-test -c /home/user/documents/configs/config.json');
  }
}
