import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/signup.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, Username, Email, password, file);
    let formdata = new FormData();
    formdata.append("firstname", firstName);
    formdata.append("lastname", lastName);
    formdata.append("username", Username);
    formdata.append("email", Email);
    formdata.append("img", file);
    formdata.append("password", password);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/signup`,
      {
        method: "POST",
        body: formdata,
      },
      { withCredentials: true }
    );
    if (res.ok) {
      console.log("User created Successfully");
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      navigate("/dashboard");
    }
  };
  return (
    <>
      <Navbar />
      <div className="signup-page">
        <div className="signup-page-heading">
          <h1>Create an account</h1>
          <p>
            Already have an account or <NavLink to="/login">Login</NavLink>
          </p>
        </div>
        <div className="signup-form">
          <div className="signup-form-input">
            <p>First Name</p>
            <input
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="signup-form-input">
            <p>Last Name</p>
            <input
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="signup-form-input">
            <p>Username</p>
            <input
              type="text"
              placeholder="Johndoe123"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="signup-form-input">
            <p>Email</p>
            <input
              type="text"
              placeholder="Johndoe@example.com"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signup-form-input">
            <p>Password</p>
            <input
              type="password"
              placeholder="......."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signup-form-input">
            <p>Profile Photo</p>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="button-class">
            <button onClick={handleOnSubmit}>Signup</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
