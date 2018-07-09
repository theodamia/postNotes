import bCrypt from 'bcrypt-nodejs';

const User = require('../models/user.js');


const createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = {

  signUp: (req, res) => {
    const user = new User({
      id: req.body._id,
      email: req.body.email,
      password: createHash(req.body.password),
    });

    User.findOne({ email: req.body.email }, (findErr, existingUser) => {
      if (existingUser) return res.sendStatus(409);

      user.save((err) => {
        if (err) return res.send(500, { error: err });
        console.log('Your user has been saved');

        return res.json(user);
      });
      return res.json(user);
    });
  },
};
