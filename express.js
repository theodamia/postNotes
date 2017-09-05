import express from 'express'
import path from 'path'
import httpProxy from 'http-proxy'
import bodyParser from 'body-parser'
import session from 'express-session'

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var app = express();

app.use(session({
  cookieName: 'session',
  secret: '2C44-4D44-WppQ38S',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  resave: true,
  saveUninitialized: true,
  secure: true, // Ensures cookies are only used over HTTPS
  ephemeral: true // Deletes the cookie when the browser is closed
}));

var PROD = process.env.NODE_ENV === 'production';
var PORT = PROD ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

var POSTS_FILE = path.join(__dirname, 'posts.json');
var USERS_FILE = path.join(__dirname, 'users.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use((req, res, next) => {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');

    // Setting the allowing methods.
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

if (!PROD) {
  var bundle = require('./server/webpack.config.dev-server.js');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
}

proxy.on('error', (e) => {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(PORT, () => {
  console.log('Express server running on port ' + PORT);
  console.log('Wepback-dev-server running on port 8080');
});

app.get('/public', (req, res) => {
  res.render('public/index');
});

/**
* Post requests
*/
var post = require('./server/db/controllers/posts.js');
app.get('/api/posts', (req, res) => {
  post.all(req, res);
});

app.post('/api/posts', (req, res) => {
  post.insert(req, res);
});

app.post('/api/posts/:id/done', (req, res) => {
  post.done(req, res);
});

app.post('/api/posts/:id/text', (req, res) => {
  post.textUpdate(req, res);
});

app.delete('/api/posts', (req, res) => {
  post.delete(req, res);
});

/**
* User requests
*/
var user = require('./server/db/controllers/users.js');
app.post('/api/users', (req, res) => {
  user.signUp(req, res);
});

app.post('/api/users/:id/isLogin', (req, res, next) => {
  user.logIn(req, res, next);
});

app.get('/api/users/:id/isLogin', (req, res) => {
  user.logOut(req, res);
});
