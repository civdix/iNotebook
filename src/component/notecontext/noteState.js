import { useEffect, useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  // const [fetchedNotes, setfetchNotes] = useState([]);
  // const hostname = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const fetchData = async () => {
    setToken(localStorage.getItem("token"));
    try {
      if (token === null) {
        console.error("Unauthorised Access", 301);
      }
      const response = await fetch(
<<<<<<< HEAD
        `http://localhost:5000/api/notes/fetchAllNotes`,
=======
        `https://i-notebook-api-threee.vercel.app/api/notes/fetchAllNotes`,
>>>>>>> origin/main
        {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Parse JSON (assuming response is JSON)

      setNotes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // Or handle the error differently (e.g., throw an exception)
    }
  };

  //Add Notes
  const addNotes = async (value) => {
    const note = {
      //need to handle error if value is not typical
      description: value.description,
      title: value.title,
      author: value.author,
      tag: value.tag,
    };
<<<<<<< HEAD
    const response = await fetch("http://localhost:5000/api/notes/saveNotes", {
=======
    const response = await fetch("https://i-notebook-api-threee.vercel.app/api/notes/saveNotes", {
>>>>>>> origin/main
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(note),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
    setResponse({ msg: "The Note Added Successfully", code: "success" });
    if (!response.ok) {
      setResponse({ msg: "The Note Failed to get ADD", code: "danger" });
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  //Delete Notes
  const deleteNotes = async (id) => {
    const returnVal = await fetch(
<<<<<<< HEAD
      `http://localhost:5000/api/notes/deleteNote/${id}`,
=======
      `https://i-notebook-api-threee.vercel.app/api/notes/deleteNote/${id}`,
>>>>>>> origin/main
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    if (!returnVal.ok) {
      setResponse({ msg: "Failed to Delete", code: "danger" });
      throw new Error(`HTTP error! status: ${returnVal.status}`);
    }

    const note = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes([...note]);
    setResponse({ msg: "The Note Deleted Successfully", code: "success" });
  };
  //Update Notes
  const updateNotes = async (id, author, title, description, tag) => {
    const targetIndex = await notes.findIndex((note1) => note1._id === id);
    const array = notes;
    const updatedData = {
      author: author,
      title: title,
      description: description,
      tag: tag,
    };

    // Get the User Details
    const account = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch("localhost:5000/api/auth/Account", {
=======
        const response = await fetch("https://i-notebook-api-threee.vercel.app/api/auth/Account", {
>>>>>>> origin/main
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        console.log("This is respinse:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setUserDetails(response);
      } catch (error) {
        console.error("\n\n\n\nthis is the error\n\n\n\n" + error);
      }
    };

<<<<<<< HEAD
    const response = await fetch("http://localhost:5000/api/notes/editNote", {
=======
    const response = await fetch("https://i-notebook-api-threee.vercel.app/api/notes/editNote", {
>>>>>>> origin/main
      method: "PUT",
      headers: {
        "auth-token": token,
        NoteId: id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    array[targetIndex] = { ...array[targetIndex], ...updatedData };

    setNotes([...array]);
    setResponse({ msg: "The Note Updated Successfully", code: "success" });
  };
  const [response, setRespo] = useState({ msg: null, code: null });
  const setResponse = (obj) => {
    setRespo(obj);
    setTimeout(() => {
      setRespo({ msg: null, code: null });
    }, 2000);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNotes,
        deleteNotes,
        updateNotes,
        fetchData,
        response,
        setResponse,
        userDetails,
      }}
    >
      {props.children}{" "}
    </NoteContext.Provider>
  );
};
export default NoteState;
