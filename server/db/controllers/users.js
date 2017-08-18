var mongoose = require('mongoose');
var User = require('../models/user.js');

module.exports = {

  insert: function(req, res) {
    const user = new User({
      id: req.body._id,
      email: req.body.email,
      password: req.body.password,
      isRegister: req.body.isRegister,
      isLogin: req.body.isLogin
    });

    user.save(function(err, user) {
      if(err) {
        return handleError(err);
        res.json(user);
      } else {
        res.json(user);
        console.log('Your user has been saved');
      }
    })
    // console.log('User Added!!');
  }

};
