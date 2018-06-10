import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/user';

module.exports = function auth() {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local', new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    ((req, username, password, done) => {
      User.findOne(
        { email: username },
        (err, user) => {
        // In case of any error, return using the done method
          if (err) { return done(err); }
          // Username does not exist, log error & redirect back
          if (!user) {
            console.log(`User Not Found with email ${username}`);
            return done(null, false);
          }
          // User exists but wrong password, log the error
          if (!user.validPassword(password)) {
            console.log('Invalid Password');
            return done(null, false);
          }
          // User and password both match, return user from
          // done method which will be treated like success
          return done(null, user);
        },
      );
    }),
  ));
};
