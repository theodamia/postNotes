var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
// var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var fs = require('fs');

// var proxy = httpProxy.createProxyServer();
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

app.get('/api/posts', function(req, res) {
  fs.readFile(POSTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/posts', function(req, res) {
  fs.readFile(POSTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var posts = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newPosts = {
      id: Date.now(),
      text: req.body.text,
    };
    posts.push(newPosts);
    fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(posts);
    });
  });
});

// We only want to run the workflow when not in production
if (!PROD) {

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var bundle = require('./server/webpack.config.dev-server.js');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });

}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(PORT, function () {
  console.log('Express server running on port ' + PORT);
  console.log('Wepback-dev-server running on port 8080');
});
