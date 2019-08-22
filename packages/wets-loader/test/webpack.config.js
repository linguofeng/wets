const path = require('path');

module.exports = {
  entry: './test/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: './dist',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'lib.js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
