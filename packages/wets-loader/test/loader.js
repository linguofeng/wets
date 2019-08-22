const webpack = require('webpack');
const config = require('./webpack.config');

const compiler = webpack(config);

compiler.run((err, stats) => {
  console.log(`\n${stats.toString({
    colors: true,
  })}\n`);
});
