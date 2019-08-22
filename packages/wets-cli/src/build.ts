import * as webpack from 'webpack';
import config from './config';

export default (options: { prod: boolean }) => {
  if (options.prod) {
    console.log('构建为生产环境');
  }
  webpack(config(options)).run((_, stats) => {
    console.log(
      `\n${stats.toString({
        colors: true,
      })}\n`,
    );
  });
};
