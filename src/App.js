import * as React from "react";
import Home from "./component/Home.jsx";
import About from "./component/About.jsx";
import Navbar from "./component/Navbar.jsx";
import Notes from "./component/Notes.jsx";
// import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoteState from "./component/notecontext/noteState.js";
import "./index.css";
import Login from "./component/Login.jsx";
import Signup from "./component/Signup.jsx";
import Modal from "./component/modal.jsx";
import Account from "./component/DashBoard.jsx";
import Dashboard from "./component/DashBoard.jsx";

function App() {
  try {
    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <>
            {" "}
            <Navbar /> <Home />
          </>
        ),
      },
      {
        path: "/about",
        element: (
          <>
            {" "}
            <Navbar /> <About />{" "}
          </>
        ),
      },
      {
        path: "/notes",
        element: (
          <>
            {" "}
            <Navbar /> <Notes />{" "}
          </>
        ),
      },
      ,
      {
        path: "/logIn",
        element: (
          <>
            {" "}
            <Navbar /> <Login />{" "}
          </>
        ),
      },
      ,
      {
        path: "/signUp",
        element: (
          <>
            {" "}
            <Navbar /> <Signup />{" "}
          </>
        ),
      },
      {
        path: "/modal",
        element: (
          <>
            {" "}
            <Navbar /> <Modal />{" "}
          </>
        ),
      },
      {
        path: "/account",
        element: (
          <>
            {" "}
            <Navbar /> <Dashboard />{" "}
          </>
        ),
      },
    ]);

    return (
      <NoteState>
        <RouterProvider router={router} />
      </NoteState>
    );
  } catch (e) {
    console.error("Error:", e);
  }
}

export default App;
