const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, './static'),
  publicPath: '/static',
  assetsDir: 'static',
  runtimeCompiler: true,
};
