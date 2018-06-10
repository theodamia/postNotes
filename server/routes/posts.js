/**
* Posts API
*/
import post from '../db/controllers/posts';

module.exports = function postsAPI(app) {
  // Get all posts
  app.get('/api/posts', (req, res) => {
    post.all(req, res);
  });

  // Insert post
  app.post('/api/posts', (req, res) => {
    post.insert(req, res);
  });

  // Update post:title
  app.post('/api/posts/:id/title', (req, res) => {
    post.titleUpdate(req, res);
  });

  // Update post:text
  app.post('/api/posts/:id/text', (req, res) => {
    post.textUpdate(req, res);
  });

  // Update post:status (initial: "default")
  app.post('/api/posts/:id/status', (req, res) => {
    post.statusUpdate(req, res);
  });

  // Delete post
  app.delete('/api/posts', (req, res) => {
    post.delete(req, res);
  });
};
