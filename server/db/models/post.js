/**
 * Schema Definitions
 */
var mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id   :String,
  text :String,
  done :Boolean
});

module.exports = mongoose.model('Post', postSchema);
