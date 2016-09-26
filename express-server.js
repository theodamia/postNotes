// var express = require('express');
// var path = require('path');
// var httpProxy = require('http-proxy');
// var mongoose = require('mongoose');
import express from ('express');
import path from ('path');
import httpProxy from ('http-proxy');
import mongoose from ('mongoose');
import bodyParser from (body-parser);

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var app = express();

var PROD = process.env.NODE_ENV === 'production';
var PORT = PROD ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

var POSTS_FILE = path.join(__dirname, 'posts.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// We only want to run the workflow when not in production
if (!PROD) {
  var bundle = require('./server/webpack.config.dev-server.js');
  bundle();
}

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(PORT, function () {
  console.log('Express server running on port ' + PORT);
  console.log('Wepback-dev-server running on port 8080');
});

//
// var bodyParser = require('body-parser');
//
// var proxy = httpProxy.createProxyServer({
//   changeOrigin: true
// });
//
// var app = express();
//
// var PROD = process.env.NODE_ENV === 'production';
// var PORT = PROD ? process.env.PORT : 3000;
// var publicPath = path.resolve(__dirname, 'public');
//
// app.use(express.static(publicPath));
//
// var POSTS_FILE = path.join(__dirname, 'posts.json');
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
//
// // Additional middleware which will set headers that we need on each request.
// app.use(function(req, res, next) {
//     // Set permissive CORS header - this allows this server to be used only as
//     // an API server in conjunction with something like webpack-dev-server.
//     res.setHeader('Access-Control-Allow-Origin', '*');
//
//     // Disable caching so we'll always get the latest comments.
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });
//
// // We only want to run the workflow when not in production
// if (!PROD) {
//   var bundle = require('./server/webpack.config.dev-server.js');
//   bundle();
// }
//
// proxy.on('error', function(e) {
//   console.log('Could not connect to proxy, please try again...');
// });
//
// app.listen(PORT, function () {
//   console.log('Express server running on port ' + PORT);
//   console.log('Wepback-dev-server running on port 8080');
// });
