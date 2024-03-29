const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://umang771:Harsh%4009@inotebook.x7vsbi1.mongodb.net/"


  const ConnectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(mongoURI);
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.log("the error is=" + error);
    }
  };


module.exports = ConnectToMongo;