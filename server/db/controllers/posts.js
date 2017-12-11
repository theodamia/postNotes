import mongoose from 'mongoose'
var Post = require('../models/post.js');

var connection = require('../connection.js');
connection.connect();

module.exports = {

  insert:(req, res) => {
    const post = new Post({
      id: req.body._id,
      title: req.body.title,
      text: req.body.text,
      done: false,
      userID: req.body.userID,
      status: ""
    });

    post.save((err, post) => {
      if(err) {
        return handleError(err);
        res.json(post);
      } else {
        res.json(post);
        console.log('Your post has been saved');
        console.log(post);
      }
    })
  },

  all:(req, res) => {
    Post.find({}).exec((err, post) => {
      if (err) {
        console.log('Error in first query');
        return res.status(500).send('Something went wrong getting the data');
      }
      return res.json(post);
    });
  },

  delete:(req, res) => {
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

  done:(req, res) => {
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

  statusUpdate:(req, res) => {
    const query = { _id: req.body._id };
    Post.findOneAndUpdate(query, {"$set": {"status":req.body.status}}, (err, post) => {
        if (err) return res.send(500, { error: err });
        res.json(post);
        console.log("Status updated:" + post.status);
    });
  },

  titleUpdate:(req, res) => {
    const query = { _id: req.body._id };
    Post.findOneAndUpdate(query, {"$set": {"title":req.body.title}}, (err, post) => {
        if (err) return res.send(500, { error: err });
        res.json(post);
        console.log("Title updated:" + post.title);
        console.log("Title updated");
    });
  },

  textUpdate:(req, res) => {
    const query = { _id: req.body._id };
    Post.findOneAndUpdate(query, {"$set": {"text":req.body.text}}, (err, post) => {
        if (err) return res.send(500, { error: err });
        res.json(post);
        console.log("Text updated");
    });
  }
};
