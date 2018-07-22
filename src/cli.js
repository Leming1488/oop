import app from 'commander';
import path from 'path';
import Feeds from './';

export default () => {
  app
    .version('0.7.3')
    .arguments('<first_config> <second_config>')
    .description('convert-feed')
    .option('-f, --format [type]', 'Output format')
    .action((firstConfig, secondConfig) => {
      new Feeds().convert({path: secondConfig, format: firstConfig, metod: app.format}).then((value) => console.log(value)) ;
    })
    .parse(process.argv)
}
