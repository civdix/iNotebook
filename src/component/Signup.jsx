import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "./notecontext/NoteContext";

const Signup = () => {
  document.title = "SignUp - iNoteBook";
  const { setResponse } = useContext(NoteContext);
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Password: "",
    Email: "",
  });
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://i-notebook-api-three.vercel.app/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: formData.Email,
          Password: formData.Password,
          Name: formData.Name,
          Phone: parseInt(formData.Phone, 10), // Base 10 for proper conversion
        }),
      });

      if (!response.ok) {
        console.log(formData, parseInt(formData.Phone, 10)); // Ensure consistent base for parseInt
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      if (json.success) {
        history("/Notes");
        setResponse({ msg: "Welcome and Enjoy Notes", code: "success" });
      } else {
        setResponse({ msg: "Please Check the details", code: "warning" });
      }
      console.log(json);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Full Name
          </label>
          <input
            onChange={onchange}
            name="Name"
            type="text"
            className="form-control"
            id="exampleInputName1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPhone1" className="form-label">
            Phone
          </label>
          <input
            onChange={onchange}
            name="Phone"
            min={9}
            type="number"
            className="form-control"
            id="exampleInputPhone1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={onchange}
            name="Password"
            type="password"
            required
            minLength={2}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={onchange}
            type="email"
            name="Email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
          {/* Will add a new feature where afer staring entrering the email user will get suggestion like 
        @gmail.com @yahoo.com @hotmail.com */}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
