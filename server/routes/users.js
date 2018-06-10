/**
* Posts API
*/
import passport from 'passport';

const user = require('../db/controllers/users');

module.exports = function usersAPI(app) {
  app.post('/api/users', (req, res) => {
    user.signUp(req, res);
  });

  app.post('/api/users/login', passport.authenticate('local'), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json(req.user);
  });

  app.get('/api/users/logout', (req, res) => {
    console.log('Logged out');
    req.logout();
    req.session.destroy(() => {
      req.session = null;
      res.clearCookie('connect.sid', { path: '/' });
      res.sendStatus(200, 'success logout');
    });
  });
};
