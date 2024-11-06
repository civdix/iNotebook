const mongoose = require("mongoose");
<<<<<<< HEAD
require("dotenv").config();
const mongoURI = process.env.MONGO_DB_URI;

const connectToMongo = async () => {
=======
const mongoURI ="mongodb+srv://shivam:124124@inotebook.iadnz.mongodb.net/?retryWrites=true&w=majority&appName=iNotebook";

const connectToMongo = async () => {
  console.log("In The Connecttomongo")
>>>>>>> origin/main
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
