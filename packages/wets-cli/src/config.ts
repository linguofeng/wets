import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import config from './config/webpack.config';

export default (options: { prod: boolean }): webpack.Configuration => {
  const configFile = path.join(process.cwd(), 'wets.config.js');
  if (!fs.existsSync(configFile)) {
    return config as webpack.Configuration;
  }
  const wets = require(configFile);
  return wets.webpack({
    ...config,
    mode: options.prod ? 'production' : 'development',
    module: {
      ...config.module,
      rules: options.prod
        ? [
          ...config.module.rules,
          {
            test: /\.js$/,
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  presets: [
                    [
                      require.resolve('babel-preset-env'),
                      {
                        modules: false,
                      },
                    ],
                  ],
                },
              },
            ],
          },
        ]
        : config.module.rules,
    },
    plugins: options.prod
      ? [
        ...config.plugins,
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          comments: false,
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
      ]
      : config.plugins,
  });
};
