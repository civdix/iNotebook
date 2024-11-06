import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "./notecontext/NoteContext";
const Login = () => {
  document.title = "Login - iNoteBook";
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let { setResponse } = useContext(NoteContext);
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const response = await fetch("http://localhost:5000/api/auth/Login", {
=======
    const response = await fetch("i-notebook-api-three.vercel.app/api/auth/Login", {
>>>>>>> origin/main
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: credentials.email,
        Password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // Reirect User to the Dashboard or Notes section
      // Setting the Token in local storage
      localStorage.setItem("token", json.loginToken);
      history("/Notes");

      setResponse({ msg: "Login Successful", code: "success" });
    } else {
      setResponse({ msg: "Invalid Details", code: "warning" });
    }
    console.log(json);
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={onChange}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            onChange={onChange}
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
