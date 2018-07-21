import app from 'commander';
import path from 'path';
import Feeds from './index';

export default () => {
  app
    .version('0.7.3')
    .arguments('<first_config> <second_config>')
    .description('convert-feed')
    .option('-f, --format [type]', 'Output format')
    .action((firstConfig, secondConfig) => {
      console.log(new Feeds({path: secondConfig, format: firstConfig, metod: app.format}).convert());
    })
    .parse(process.argv)
}
