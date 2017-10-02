import User from '../models/user'
import { Strategy } from 'passport-local'
import mongoose from 'mongoose'
import passport from 'passport'

module.exports =  function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function(_id, done) {
      User.findById(_id, function(err, user) {
          done(err, user);
      });
  });

  passport.use('local', new Strategy({
      usernameField: 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, username, password, done) {
      User.findOne({ 'email' :  username },
      function(err, user) {
        // In case of any error, return using the done method
        if (err) { return done(err); }
        // Username does not exist, log error & redirect back
        if (!user) {
          console.log('User Not Found with email '+username);
          return done(null, false)
        }
        // User exists but wrong password, log the error
        if (!user.validPassword(password)) {
          console.log('Invalid Password');
          return done(null, false)
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      }
    );
  }));

};
