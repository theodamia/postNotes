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

    post.save((err, post) => {
      if (err) {
        return handleError(err);
        res.json(post);
      }
      res.json(post);
      console.log('Your post has been saved');
    });
  },

  all: (req, res) => {
    Post.find({}).exec((err, post) => {
      if (err) {
        console.log('Something went wrong getting the data');
        return res.status(500).send('Something went wrong getting the data');
      }
      return res.json(post);
    });
  },

  titleUpdate: (req, res) => {
    const query = { _id: req.body._id };
    Post.findOneAndUpdate(query, { $set: { title: req.body.title } }, { new: true }, (err, post) => {
      if (err) return res.send(500, { error: err });
      res.json(post);
      console.log(`Title updated:${post.title}`);
    });
  },

  textUpdate: (req, res) => {
    const query = { _id: req.body._id };
    Post.findOneAndUpdate(query, { $set: { text: req.body.text } }, { new: true }, (err, post) => {
      if (err) return res.send(500, { error: err });
      res.json(post);
      console.log(`Text updated: ${post.text}`);
    });
  },

  statusUpdate: (req, res) => {
    const query = { _id: req.body._id };
    Post.findOneAndUpdate(query, { $set: { status: req.body.status } }, { new: true }, (err, post) => {
      if (err) return res.send(500, { error: err });
      res.json(post);
      console.log(`Status updated:${post.status}`);
    });
  },

  delete: (req, res) => {
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
};
