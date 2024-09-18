import React, { useEffect, useState } from "react";

import Navbar from "../component/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/userdashboard.css";

function UserDasboard() {
  const navigate = useNavigate();
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

    if (seconds < 60) {
      return seconds + " seconds ago";
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return hours === 1 ? "1 hour ago" : hours + " hours ago";
    } else {
      const days = Math.floor(seconds / 86400);
      return days === 1 ? "1 day ago" : days + " days ago";
    }
  };

  const [userinfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/user/getuserinfo`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, []);
  const navigateToAddBlog = () => {
    navigate("/addblog");
  };

  console.log(userinfo);
  return (
    <>
      <Navbar />

      <>
        <>
          {userinfo.map((user) => (
            <div className="userinfo">
              <div className="welcoming-user">
                <h1>Welcome {user.firstName} </h1>
              </div>
              <h2>Your blogs</h2>
              <div className="blogs">
                {user?.blog.length === 0 ? (
                  <>
                    <p> No blogs</p>
                  </>
                ) : (
                  user.blog.map((blog) => (
                    <>
                      <NavLink to={`/blog/${blog._id}`}>
                        <div className="recent-blog">
                          <div className="blog-card">
                            <div className="blog-image">
                              <img src={blog.blogThumbnail} alt={blog._id} />
                              <br />
                            </div>
                            <div className="blog-para">
                              <div className="blog-title">
                                <h1>{blog.title}</h1>

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
                        </div>
                      </NavLink>
                    </>
                  ))
                )}
                <button onClick={navigateToAddBlog}> Add Blog</button>
              </div>
            </div>
          ))}
        </>
      </>
    </>
  );
}

export default UserDasboard;
