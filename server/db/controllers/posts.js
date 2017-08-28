var mongoose = require('mongoose');
var Post = require('../models/post.js');

var connection = require('../connection.js');
connection.connect();

module.exports = {

  insert: function(req, res) {
    const post = new Post({
      id: req.body._id,
      text: req.body.text,
      done: false
    });

    post.save((err, post) => {
      if(err) {
        return handleError(err);
        res.json(post);
      } else {
        res.json(post);
        console.log('Your post has been saved');
      }
    })
  },

  all: function(req, res) {
    Post.find({}).exec((err, post) => {
      if (err) {
        console.log('Error in first query');
        return res.status(500).send('Something went wrong getting the data');
      }

      return res.json(post);
    });
  },

  delete: function(req, res) {
    const query = { _id: req.body._id };
    Post.findOneAndRemove(query, (err, post) => {
      if (err) {
        return res.status(500).send('We failed to delete for some reason');
        res.json(post);
      }

      console.log('Your post has been deleted');
      res.json(post);
    });
  },

  done: function(req, res) {
    const query = { _id: req.body._id };
    Post.findById(query, (err, post) => {
      if(post.done) {
        post.done = false;
      } else {
        post.done = true;
      }
      post.save(function (err, post) {
        if (err) return handleError(err);
          res.json(post);
      });
    });
  },

  textUpdate: function(req, res) {
    const query = { _id: req.body._id };
    Post.findOneAndUpdate(query, {"$set": { "text":req.body.text}}, (err, post) => {
        if (err) return res.send(500, { error: err });
        res.json(post);
        console.log("Text updated");
    });
  }
};
