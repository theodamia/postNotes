var mongoose = require('mongoose');
var User = require('../models/user.js');

module.exports = {

  signUp: function(req, res) {
    const user = new User({
      id: req.body._id,
      email: req.body.email,
      password: req.body.password,
      isRegister: req.body.isRegister,
      isLogin: req.body.isLogin
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
  },

  fetchUser: function(req, res) {
    const query = { _id: req.body._id };
    User.findById(query, (err, user) => {
      if (err) {
        return res.status(500).send('User not found');
        res.json(user);
      }
      console.log('User found');
      res.json(user);
    });
  }
};
