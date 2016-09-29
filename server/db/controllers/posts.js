var mongoose = require('mongoose');
var Post = require('../models/post.js');

var connection = require('../connection.js');
connection.connect();

module.exports = {
  all: function(req, res) {
    Post.find({}).exec((err, posts) => {
      if (err) {
        console.log('Error in first query');
        return res.status(500).send('Something went wrong getting the data');
      }

      return res.json(posts);
    });
  },

  insert: function(req, res) {
    const post = new Post({
      text: req.body.text
    });

    post.save(function(err, post) {
      if(err){
        return handleError(err);
        res.json(post);
      } else {
        res.json(post);
        console.log('your form has been saved');
      }
    })
  }
};
