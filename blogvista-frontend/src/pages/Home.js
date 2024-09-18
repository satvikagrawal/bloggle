import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import "../styles/home.css";
import { NavLink } from "react-router-dom";

/**
 * Shows a list of blogs and time ago. The user is prompted to select a blog by their username and then he / she will be able to view it.
 *
 *
 * @return { Promise } Resolves when the app is ready to display the home page. Rejects if there is an error
 */
function Home() {
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/blog/getblogs`)
      .then((res) => res.json())
      .then((data) => {
        setblogs(data);
      });
  }, []);

  const getDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Month is zero-based, so add 1
    const day = dateObject.getDate();
    const getdate = `${year}-${month}-${day}`;
    console.log(getdate);
    return getdate;
  };
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    // Returns a string representing the number of seconds ago.
    if (seconds < 60) {
      return seconds + " seconds ago";
      // Returns a string representing the number of seconds ago.
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
      // Returns a string representing the number of days ago ago.
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return hours === 1 ? "1 hour ago" : hours + " hours ago";
    } else {
      const days = Math.floor(seconds / 86400);
      return days === 1 ? "1 day ago" : days + " days ago";
    }
  };
  return (
    <>
      <Navbar />
      <div className="homepage">
        {blogs.map((blog) => (
          <>
            <NavLink to={`/blog/${blog._id}`}>
              <div className="blog-card">
                <div className="blog-image">
                  <img src={blog.blogThumbnail} alt={blog._id} />
                  <br />
                </div>
                <div className="blog-para">
                  <div className="blog-title">
                    <h1>{blog.title}</h1>
                    <div className="creator-profile">
                      <img src={blog.createdBy.profilePic} alt="profilepic" />

                      <p>{blog.createdBy.username} </p>
                    </div>
                    <div className="datetime">
                      <span className="dated">
                        Date: {getDate(blog.createdAt)}
                      </span>

                      <span className="timesago">
                        {timeAgo(blog.createdAt)}{" "}
                      </span>
                    </div>
                  </div>
                  <div className="blog-para-para">
                    <p>{blog.content}</p>
                  </div>
                </div>
              </div>
            </NavLink>
          </>
        ))}
      </div>
    </>
  );
}

export default Home;
