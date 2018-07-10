/**
* Users API
*/
import passport from 'passport';

const user = require('../db/controllers/users');

module.exports = function usersAPI(app) {
  // Sign up user
  app.post('/api/users', (req, res) => {
    user.signUp(req, res);
  });

  // Login user
  app.post('/api/users/login', passport.authenticate('local'), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json(req.user);
  });

  // Logout user
  app.get('/api/users/logout', (req, res) => {
    req.logout();
    req.session.destroy(() => {
      req.session = null;
      res.clearCookie('connect.sid', { path: '/' });
      res.sendStatus(200, 'Success Logout');
    });
  });
};
