import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  id: String,
  title: String,
  text: String,
  status: String,
  userID: String
});

module.exports = mongoose.model('Post', postSchema);
