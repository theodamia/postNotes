const Post = require('../models/post.js');
const connection = require('../connection.js');

connection.connect();

module.exports = {

  insert: (req, res) => {
    const post = new Post({
      id: req.body._id,
      title: req.body.title,
      text: req.body.text,
      userID: req.body.userID,
      status: 'default',
    });

    post.save((err) => {
      if (err) return res.send(500, { error: err });
      console.log('Your post has been saved');
      return res.json(post);
    });
  },

  all: (req, res) => {
    Post.find({}).exec((err, post) => {
      if (err) return res.send(500, { error: err });
      return res.json(post);
    });
  },

  titleUpdate: (req, res) => {
    const query = { _id: req.body._id };
    Post.findOneAndUpdate(query, { $set: { title: req.body.title } }, { new: true }, (err, post) => {
      if (err) return res.send(500, { error: err });
      console.log(`Title updated:${post.title}`);
      return res.json(post);
    });
  },

  textUpdate: (req, res) => {
    const query = { _id: req.body._id };
    Post.findOneAndUpdate(query, { $set: { text: req.body.text } }, { new: true }, (err, post) => {
      if (err) return res.send(500, { error: err });
      console.log(`Text updated: ${post.text}`);
      return res.json(post);
    });
  },

  statusUpdate: (req, res) => {
    const query = { _id: req.body._id };
    Post.findOneAndUpdate(query, { $set: { status: req.body.status } }, { new: true }, (err, post) => {
      if (err) return res.send(500, { error: err });
      console.log(`Status updated:${post.status}`);
      return res.json(post);
    });
  },

  delete: (req, res) => {
    const query = { _id: req.body._id };
    Post.findOneAndRemove(query, (err, post) => {
      if (err) return res.send(500, { error: err });
      console.log('Your post has been deleted');
      return res.json(post);
    });
  },
};
