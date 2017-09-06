import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  password: String,
  isLogin: Boolean,
  isRegister: Boolean
});

module.exports = mongoose.model('User', userSchema);
