var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  loginStatus: Boolean
});

module.exports = mongoose.model('User', userSchema);
