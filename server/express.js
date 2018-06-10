/* eslint no-console:  0 */
import path from 'path';
import express from 'express';
import httpProxy from 'http-proxy';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import ExSessions from 'express-sessions';
import auth from './db/passport/auth';
// import webpackDevConfig from './webpack.config.dev-server';

const app = express();

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
});

// Additional middleware which will set headers that we need on each request.
app.use((req, res, next) => {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
  // Setting the allowing methods.
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PROD = process.env.NODE_ENV === 'production';
const PORT = PROD ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

app.get('/public', (req, res) => {
  res.render('public/index');
});

if (!PROD) {
  // const bundle = webpackDevConfig;
  // bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080',
    });
  });
}

proxy.on('error', () => {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
  console.log('Wepback-dev-server running on port 8080');
});


let store;
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: ((60 * 1000) * 60),
  },
  store: store = new (ExSessions)({
    storage: 'mongodb',
    instance: mongoose,
    host: 'localhost',
  }),
  resave: true,
  saveUninitialized: false,
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

auth(passport);

// Post routes
require('./routes/posts')(app);
// User routes
require('./routes/users')(app);
