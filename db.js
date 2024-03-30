const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://umang771:Harsh%4009@inotebook.x7vsbi1.mongodb.net/"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;