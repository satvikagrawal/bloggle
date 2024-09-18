import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const RenderMenu = () => {
    const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    if (isAuthenticated) {
      return (
        <>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        </>
      );
    }

    //   return (
    //   );
    // } else {
    //   return (
    //     <>
    //       <li>
    //         <NavLink to="/login">Login</NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/signup">Signup</NavLink>
    //       </li>
    //     </>
    //   );
    // }
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>
            <NavLink to="/">Bloggle</NavLink>
          </h1>
        </div>
        <ul className="navlinks">
          <RenderMenu />
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
