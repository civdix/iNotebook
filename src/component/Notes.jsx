import React, { useContext, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { CiRead } from "react-icons/ci";
import NoteContext from "./notecontext/NoteContext";
import AddNotes from "./AddNotes";
// import Alert from "./Alert";
import "./css/styles.css";
function Notes() {
  document.title = "Base - iNotebook";
  const history = useNavigate();
  // const apiUrl = "http://localhost:5000/api/notes/fetchAllNotes";
  let { notes, deleteNotes, fetchData, updateNotes } = useContext(NoteContext);
  const [note, setNote] = useState({
    description: "",
    _id: "",
    author: "",
    title: "",
    tag: "",
  });

  const ref = useRef(null);
  const ref1 = useRef(null);
  // const ref1 = useRef(null);
  const updateToggle = (note) => {
    ref.current.click();
    setNote({ ...note });
  };
  const showToggle = (note) => {
    // elem = document.querySelector("#exampleMod");
    ref1.current.click();
    setNote({ ...note });
  };
  const onchange = (event) => {
    const name = event.target.name;
    setNote({
      ...note,
      [name]: event.target.value === "" ? note.name : event.target.value,
      // [name]: event.target.value !== "" ?event.target.value:notes.filter(note1 =>{note1._id = note._id}).name
    });
  };

  useEffect(() => {
    localStorage.getItem("token") ? fetchData() : history("/Login");
  }, []);
  return (
    <div className="container position-relative">
      <AddNotes />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal2"
        ref={ref1}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
      >
        {
          //ViewNote
        }
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {note.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              >
                {/* <span aria-hidden="true">&times;</span> */}
              </button>
            </div>
            <div className="modal-body">
              <div className="">
                <label htmlFor="author">Author Name : {note.author}</label>
              </div>
              <hr />
              <div className="form-group">
                <label
                  className="d-flex justify-content-center "
                  htmlFor="description"
                >
                  Description
                </label>
                <p>
                  {note.description.split("\n").map((elem, index) => {
                    return (
                      <span key={index}>
                        {elem}
                        <br />
                      </span>
                    );
                  })}
                </p>
              </div>{" "}
              <hr />
              <div className="form-group">
                <label htmlFor="tag">Tags: {note.tag}</label>
              </div>{" "}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {" "}
        {
          //Edit notes
        }
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              >
                {/* <span aria-hidden="true">&taimes;</span> */}
              </button>
            </div>
            <div className="modal-body">
              <div className="">
                <label htmlFor="author">Author Name</label>
                <input
                  type="text"
                  value={note.author}
                  className="form-control"
                  id="author"
                  name="author"
                  onChange={onchange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  value={note.title}
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={onchange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  className="form-control "
                  value={note.description}
                  id="description"
                  name="description"
                  onChange={onchange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tag">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  value={note.tag}
                  onChange={onchange}
                />
              </div>{" "}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {/* add author field in code upper */}
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={() => {
                  // ref1.current.click(); || us
                  return updateNotes(
                    note._id,
                    note.author,
                    note.title,
                    note.description,
                    note.tag
                  );
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        {notes.map((note, index) => {
          return (
            <div className="card w-25 mx-4" key={note._id}>
              <div className="card-body ">
                <h5>{note.title ? index + 1 + ":" + note.title : ""}</h5>
                <p className="card-title">
                  tag: {`  ${note.tag}`}
                  <br />
                  By :{note.author} <br />
                  <span>
                    On {note.date.slice(0, 10)} at {note.date.slice(11, 19)}
                  </span>
                </p>
                <p className="card-text">{note.description}</p>
                <p
                  className="btn btn-primary float-bottom"
                  onClick={(e) => {
                    return deleteNotes(note._id);
                  }}
                >
                  <MdDeleteForever />
                </p>{" "}
                <p
                  className="btn btn-primary"
                  onClick={(e) => {
                    return updateToggle(note);
                  }}
                >
                  <MdModeEdit />
                </p>{" "}
                <p
                  className="btn btn-primary"
                  onClick={(e) => {
                    return showToggle(note);
                  }}
                >
                  <CiRead />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notes;
