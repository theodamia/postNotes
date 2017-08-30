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

  logIn: function(req, res) {
    const query = { email: req.body.email, password: req.body.password };
    User.findOne(query, (err, user) => {
      if (err) {
        return res.status(500).send('Something didnt go as planned.');
      }
      if (!user) {
        return res.status(401).send('Email or password incorrect.');
      } else {
        req.session.user = user;
        // res.redirect('http://localhost:8080/public/');
        res.json(user);
        // console.log("User: %j", user);
        console.log(req.session.user);

      }
    });
  }
};
