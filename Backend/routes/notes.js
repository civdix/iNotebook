const express = require("express");
const router = express.Router();
const fetchUser = require("../middleWares/fetchData");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const { route } = require("./auth");
const { findOneAndUpdate } = require("../models/User");
//Get all the notes Route 1 Get all the notes from database by the fetchUser middleware given user id   || Login Required CRUD - Read
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    console.log(req.user.id, " this is the vlau of id of user");
    const notes = await Notes.find({ user: req.user.id });
    return res.json(notes);
  } catch (error) {
    console.log(error.msg);
  }
});

//Route 2 : To Post the Notes in Database || Login Required   CRUD - Create
router.post(
  "/saveNotes",
  fetchUser, 
  [
    body("title", "Title can not be Empty").isLength({ min: 1 }),
    body("author", "Please Enter valid author name").isString(),
    body("description", "Please Enter some Description").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const { title, description, tag, author } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ Errors: errors.array() });
    }
    try {
      const note = new Notes({
        title,
        description,
        tag,
        author,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      console.log(error.msg);
    }
  }
);

//Route 3 -  Delete the Notes from the Database of self  get Request /api/notes/EditNotes CRUD - D Login Required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  //Here if We Get any value from the header of specific note to be delete then we will delete it if not then very first note will be deleted for that user
  try {
    const DeleteNoteId = req.params.id;
    const notes = await Notes.findOne(
      DeleteNoteId && 1
        ? { user: req.user.id, _id: DeleteNoteId }
        : { user: req.user.id }
    );
    await Notes.deleteOne(
      DeleteNoteId && 1
        ? { user: req.user.id, _id: DeleteNoteId }
        : { user: req.user.id }
    );
    return res.send(notes + " Succesfullt Deleted");
  } catch (error) {
    console.log(error, "Error message from catch block of DeleteNote");
  }
});

// Route 4 To Update the Value is any note here we will update teh value to be provided by the user

router.put(
  "/editNote",
  [
    body("title", "Please Enter Title").isLength({ min: 1 }),
    body("description", "Please Enter Description").isLength({ min: 1 }),
  ],
  fetchUser,
  async (req, res) => {
    //Now we will take the NoteId from Header and reder that value to it
    const { title, author, description, tag, date } = req.body;

    try {
      const NoteId = req.header("NoteId");
      const notes = {
         
          title,
          description,
          author,
          date,
          tag,
        
      };

      //diffrent approach to give query as a object not hardcorely bbut by a variable and we will update our query if NoteId is given 
      let query = { user: req.user.id }; // Default query for update

      // If NoteId is provided in headers, update based on user id and NoteId
      if (NoteId) {
        query._id = NoteId;
      }
      const updatedNote = await Notes.findOneAndUpdate(query, notes, {
        new: true,
        upsert: true,
      });

      if (!updatedNote) {
        return res.status(404).send("Note not found");
      }
      // Send success response with the updated note
      return res.send("Note updated successfully: " + updatedNote);
    } catch (error) {
      console.error("Error updating note:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
