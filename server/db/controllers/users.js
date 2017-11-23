import mongoose from 'mongoose'
import passport from 'passport'
var User = require('../models/user.js');
import bCrypt  from 'bcrypt-nodejs'

var createHash = function(password) {
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = {

  signUp:(req, res) => {
    const user = new User({
      id: req.body._id,
      email: req.body.email,
      password: createHash(req.body.password)
    });

    User.findOne({ email: req.body.email }, (findErr, existingUser) => {
      if (existingUser) {
        return res.sendStatus(409);
      } else {
        user.save((err, user) => {
          if(err) {
            return handleError(err);
            res.json(user);
          } else {
            res.json(user);
            console.log('Your user has been saved');
          }
        })
      }
    });
  }
};
