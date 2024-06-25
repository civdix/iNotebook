//Here we desogn the userSchema for ur app
const mongoose = require("mongoose");
const { Schema } = mongoose;
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  description: {  
    type: String,
    requrie: true,
  },
  title: {
    type: String,
    require: true,
  }, // String is shorthand for {type: String}
  author: {
    type: String,
    default: "Unknown",
  },
  tag: {
    type: String,
    default: "General",
  },
  body: String,
 

  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("notes", NotesSchema);
