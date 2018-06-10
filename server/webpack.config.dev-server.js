const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./../webpack.config.js');

module.exports = function devServerConfig() {
  // First we fire up Webpack an pass in the configuration we created
  let bundleStart = null;
  const compiler = Webpack(webpackConfig);

  // We give notice in the terminal when it starts bundling and
  // set the time it started
  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  // We also give notice when it is done compiling, including the
  // time it took.
  compiler.plugin('done', () => {
    console.log(`Bundled in ${Date.now() - bundleStart}ms!`);
  });

  const bundler = new WebpackDevServer(compiler, {
    // We need to tell Webpack to serve our bundled application
    // from the build path. When proxying:
    // http://localhost:3000/build -> http://localhost:8080/build
    publicPath: '/build/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Credentials': true,
    },
    port: 8080,
    host: 'localhost',
    noInfo: true,
    historyApiFallback: {
      index: 'public/index.html',
    },
    open: true,
    openPage: 'public/',
  });

  // We fire up the development server and give notice in the terminal
  // that we are starting the initial bundle
  bundler.listen(8080, 'localhost', () => {
    console.log('Bundling project, please wait...');
  });
};
