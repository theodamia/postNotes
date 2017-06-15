var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');

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

    // Setting the allowing methods.
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

app.get('/public', function(req, res) {
  res.render('public/index');
});

var post = require('./server/db/controllers/posts.js');
app.get('/api/posts', function(req, res) {
  post.all(req, res);
});

app.post('/api/posts', function(req, res) {
  post.insert(req, res);
});

app.delete('/api/posts', function(req, res) {
  post.delete(req, res);
});

if (!PROD) {
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

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(PORT, function () {
  console.log('Express server running on port ' + PORT);
  console.log('Wepback-dev-server running on port 8080');
});