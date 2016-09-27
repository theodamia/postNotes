var mongoose = require('mongoose');

module.exports = {
  connectDB: function() {
    mongoose.connect('mongodb://localhost:27017/notesDB');

    var db = mongoose.connection;
    db.on('error', function callback(err) {
      console.log("Database connection failed. Error: " + err);
    });
    db.once('open', function callback() {
      console.log("Database connection successful");
    });
  }
};

// import fs from 'fs';
// import path from 'path';
// import mongoose from 'mongoose';
//
// var dbURI = 'mongodb://localhost/notesDB';
//
// export default () => {
//   // Find the appropriate database to connect to, default to localhost if not found.
//   const connect = () => {
//     mongoose.connect(db, (err) => {
//       if (err) {
//         console.log(`===>  Error connecting to ${dbURI}`);
//         console.log(`Reason: ${err}`);
//       } else {
//         console.log(`===>  Succeeded in connecting to ${dbURI}`);
//       }
//     });
//   };
//   connect();
//
//   mongoose.connection.on('error', console.log);
//   mongoose.connection.on('disconnected', connect);
//
//   // Register schema as mongoose model
//   const modelPath = path.join(__dirname, 'models');
//   fs.readdirSync(modelPath).forEach((file) => {
//     if (~file.indexOf('.js')) require(`${modelPath}/${file}`);
//   });
// };
