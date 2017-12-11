import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  id: String,
  title: String,
  text: String,
  done: Boolean,
  userID: String,
  status: String
});

module.exports = mongoose.model('Post', postSchema);
