const mongoose = require('mongoose');

//const mongoURI = "mongodb+srv://Umang771:Harsh@09@cluster0.xemndtl.mongodb.net/"
const mongoURI = "mongodb+srv://Umang771:Harsh@09@cluster0.xemndtl.mongodb.net/inotebook?retryWrites=true&w=majority"
                                                          

const connectToMongo = async ()=>{
   try {
        // Modern Mongoose versions prefer standard async/await
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Stop the server if the database fails to connect
    }
}

module.exports = connectToMongo;
