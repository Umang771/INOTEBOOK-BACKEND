const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://Umang771:Harsh%4009@cluster0.a3wafdq.mongodb.net/?appName=Cluster0"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;
