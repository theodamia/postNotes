import express from 'express'
import path from 'path'
import httpProxy from 'http-proxy'
import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import auth from './server/db/passport/auth'
import mongoose from 'mongoose'

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var store;
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: ((60 * 1000) * 60)
  },
  store: store = new (require('express-sessions')) ({
    storage: 'mongodb',
    instance: mongoose,
    host: 'localhost'
  }),
  resave: true,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

auth(passport);

var PROD = process.env.NODE_ENV === 'production';
var PORT = PROD ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

app.get('/public', (req, res) => {
  res.render('public/index');
});

var POSTS_FILE = path.join(__dirname, 'posts.json');
var USERS_FILE = path.join(__dirname, 'users.json');

// Additional middleware which will set headers that we need on each request.
app.use((req, res, next) => {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
    // Setting the allowing methods.
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, PATCH");
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
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

/**
* Posts API
*/
var post = require('./server/db/controllers/posts.js');
// Get all posts
app.get('/api/posts', (req, res) => {
  post.all(req, res);
});

//Insert post
app.post('/api/posts', (req, res) => {
  post.insert(req, res);
});

app.post('/api/posts/:id/done', (req, res) => {
  post.done(req, res);
});

app.post('/api/posts/:id/status', (req, res) => {
  post.statusUpdate(req, res);
});

app.post('/api/posts/:id/title', (req, res) => {
  post.titleUpdate(req, res);
});

app.post('/api/posts/:id/text', (req, res) => {
  post.textUpdate(req, res);
});

app.delete('/api/posts', (req, res) => {
  post.delete(req, res);
});

/**
* User API
*/
var user = require('./server/db/controllers/users.js');
app.post('/api/users', (req, res) => {
  user.signUp(req, res);
});

app.post('/api/users/login', passport.authenticate('local'), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json(req.user);
});

app.get('/api/users/logout', (req, res) => {
  console.log("Logged out");
  req.logout();
  req.session.destroy((err) => {
    req.session = null;
    res.clearCookie('connect.sid', {path: '/'});
    res.sendStatus(200, 'success logout');
  });
});
