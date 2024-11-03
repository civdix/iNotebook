const mongoose = require("mongoose");
const mongoURI ="mongodb+srv://shivam:124124@inotebook.iadnz.mongodb.net/?retryWrites=true&w=majority&appName=iNotebook";

const connectToMongo = async () => {
  console.log("In The Connecttomongo")
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
