/* eslint no-console: [{ allow: ["log"] }] */
import mongoose from 'mongoose';

module.exports = {
  connect: () => {
    mongoose.connect('mongodb://localhost:27017/postsDB');

    const db = mongoose.connection;

    db.on('error', (err) => {
      console.log(`Database connection failed. Error: ${err}`);
    });

    db.once('open', () => {
      console.log('Database connection successful');
    });
  },
};
