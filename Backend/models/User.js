//Here we desogn the userSchema for ur app

const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  Name: {
    type: String,
    require: true,
  }, // String is shorthand for {type: String}
  Email: {
    type: String,
    require: true,
    unique: true,
  },
  Phone: {
    type: Number,
  },
  Password: {
    type: String,
    require: true,
  },
});
const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
