import React, { useContext, useState } from "react";
import NoteContext from "./notecontext/NoteContext";

function AddNotes() {
  const { addNotes } = useContext(NoteContext);

  const [note, setNote] = useState({
    author: "",
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    // e.preventDefault();
    addNotes(note);
    setNote({ author: "", title: "", description: "", tag: "" });
  };

  const onchange = (event) => {
    setNote({
      ...note,
      // [event.target.name]: ( event.target.value!==null)?null:event.target.value,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="container">
      <h1>Add Your Notes</h1>
      <form>
        <div className="">
          <label htmlFor="author">Author Name</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            onChange={onchange}
            value={note.author}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={note.title}
            name="title"
            onChange={onchange}
          />
        </div>

        <div className= "form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            rows="3"
            id="description"
            value={note.description}
            name="description"  
            onChange={onchange}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={note.tag}
            name="tag"
            onChange={onchange}
          />
        </div>
        <button
          disabled={
            note.description.length > 0 && note.title.length > 0 ? false : true
          }
          className="btn btn-primary my-1"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
      <h1>Your Notes</h1>
    </div>
  );
}

export default AddNotes;
