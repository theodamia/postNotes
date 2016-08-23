/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  id    :String,
  text  :String
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
module.exports = mongoose.model('Post', PostSchema);
