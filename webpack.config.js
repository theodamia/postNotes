var Webpack = require('webpack');
var path = require('path');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'index.js');

var config = {
  devtool: 'eval',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    mainPath
  ],
  output: {
    filename: 'bundle.js',
    path: buildPath,
    publicPath: '/build/'
  },
  module: {
    rules: [{
      test: [/\.js$|\.jsx$/],
      loader: 'babel-loader',
      exclude: [nodeModulesPath]
    },
    {
      test: /\.(css|pcss|scss)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
          // options: {
          //     importLoaders: 1,
          // }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.resolve(__dirname, 'postcss.config.js')
            }
          }
        },
        {
          loader: "sass-loader"
        }
      ]
    }]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
    new Webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      cookie: 'cookie',
      axios: 'axios',
      '_': 'lodash'
    })
  ]
};

module.exports = config;
