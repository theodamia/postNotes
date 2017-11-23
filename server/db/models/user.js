import mongoose from 'mongoose'
import bCrypt  from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  password: String
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bCrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
