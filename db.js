const mongoose = require('mongoose');

//const mongoURI = "mongodb+srv://Umang771:Harsh@09@cluster0.xemndtl.mongodb.net/"
const mongoURI = "mongodb+srv://Umang771:Harsh@09@cluster0.xemndtl.mongodb.net/inotebook?retryWrites=true&w=majority"
                                                          

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;
