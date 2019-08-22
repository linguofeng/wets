import * as path from 'path';

const wxml = filename =>
  filename
    .replace('src/', '')
    .slice(0, -1)
    .concat('.wxml');
const wxss = filename =>
  filename
    .replace('src/', '')
    .slice(0, -1)
    .concat('.wxss');

export default {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('wets-loader'),
          },
          {
            loader: require.resolve('wets-tsx-loader'),
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /app\.css$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: '[name].wxss',
            },
          },
          {
            loader: require.resolve('extract-loader'),
          },
          {
            loader: require.resolve('css-loader'),
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: () => [require('precss')({})],
            },
          },
        ],
      },
      {
        test: /[a-z-]+\.page\.css$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: '[path]',
              outputPath: wxss,
            },
          },
          {
            loader: require.resolve('extract-loader'),
          },
          {
            loader: require.resolve('css-loader'),
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: () => [require('precss')],
            },
          },
        ],
      },
      {
        test: /[a-z-]+\.page\.html$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: '[path]',
              outputPath: wxml,
            },
          },
        ],
      },
      {
        test: /[a-z-]+\.page\.pug$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: '[path]',
              outputPath: wxml,
            },
          },
          {
            loader: require.resolve('pug-html-loader'),
          },
        ],
      },
    ],
  },
  plugins: [],
  output: {
    filename: 'lib.js',
    path: path.resolve(process.cwd(), 'dist'),
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
