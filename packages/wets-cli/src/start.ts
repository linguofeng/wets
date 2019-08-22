import * as webpack from 'webpack';
import config from './config';

export default async () => {
  webpack(
    config({
      prod: false,
    }),
  ).watch(
    {
      aggregateTimeout: 500,
    },
    (_, stats) => {
      console.log(
        `\n${stats.toString({
          colors: true,
        })}\n`,
      );
    },
  );
};
