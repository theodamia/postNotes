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
      id: req.body._id,
      text: req.body.text,
      done: false
    });

    post.save(function(err, post) {
      if(err) {
        return handleError(err);
        res.json(post);
      } else {
        res.json(post);
        console.log('Your post has been saved');
      }
    })
  },

  delete: function(req, res) {
    const query = { _id: req.body._id };
    Post.findOneAndRemove(query, (err, posts) => {
      if (err) {
        return res.status(500).send('We failed to delete for some reason');
        res.json(posts);
      }

      console.log('Your post has been deleted');
      res.json(posts);
    });
  },

  done: function(req, res) {
    const query = { _id: req.body._id };
    Post.findById(query, (err, post) => {
      post.done = true;
      post.save(function (err, post) {
        if (err) return handleError(err);
          res.json(post);
      });
    });
  }
};
