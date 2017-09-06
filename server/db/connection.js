import mongoose from 'mongoose'

module.exports = {
  connect:() => {
    mongoose.connect('mongodb://localhost:27017/postsDB');

    var db = mongoose.connection;
    db.on('error', function callback(err) {
      console.log("Database connection failed. Error: " + err);
    });
    db.once('open', function callback() {
      console.log("Database connection successful");
    });
  }
};
