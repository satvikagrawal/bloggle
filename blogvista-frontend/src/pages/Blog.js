import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { useParams } from "react-router-dom";
import "../styles/blog.css";
import { AiFillDelete, AiFillLike, AiOutlineComment } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";

/**
 * Creates a new Blog. The blog is an object with properties that allow you to interact with the blog.
 *
 *
 * @return { Blog } A newly created blog object that can be used in conjunction with React's #observe
 */

function Blog() {
  const [error, setError] = useState("");
  const [blog, setBlog] = useState([]);
  const [isCommentVisible, setCommentVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [blogComments, setBlogComments] = useState([]);
  const { id } = useParams();
  const getComments = useCallback(async () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/blog/getcomments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogComments(data);
      });
  }, [id]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/blog/getblog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
      });
    getComments();
  }, [id, getComments]);

  console.log(blogComments);

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
  const toggleCommentSection = () => {
    setCommentVisible(!isCommentVisible);
  };

  const handleAddComment = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/blog/addcomment/${id}`,
        {
          comment: comment,
        },
        { withCredentials: true }
      )
      .then(() => console.log("Comment added successfully"))
      .catch((err) => setError(""));
    getComments();
    setComment("");

    // Check if the response status is in the range 200-299, indicating success
  };
  const handleDeleteComment = async (commentid) => {
    await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/blog/deletecomment/${id}/${commentid}`,
        {
          withCredentials: true,
        }
      )
      .then(() => console.log("Comment deleted successfully"))
      .catch((err) => setError("You are not authorized"));
    console.log(commentid);
    getComments();
  };

  const handleLikePost = async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/blog/like/${id}`, {
      method: "PUT",
    })
      .then(() => console.log("hello word"))
      .catch(() => console.log("error"));
  };

  return (
    <>
      <Navbar />
      <div className="blog">
        <div className="single-blog-card">
          {blog.map((blog) => (
            <>
              <div className="single-blog-title">
                <h1>{blog.title}</h1>
              </div>
              <div className="single-creator-profile">
                <img src={blog.createdBy.profilePic} alt="profilepic" />

                <p>{blog.createdBy.username} </p>
              </div>
              <div className="single-blog-image">
                <img src={blog.blogThumbnail} alt={blog._id} />
                <br />
              </div>
              <div className="datetime">
                <span className="dated">Date: {getDate(blog.createdAt)}</span>

                <span className="timesago">{timeAgo(blog.createdAt)} </span>
              </div>
              <div className="single-blog-para-para">
                <p>{blog.content}</p>
              </div>
              <div className="actions">
                {error}
                <div className=" like-button" onClick={handleLikePost}>
                  <AiFillLike className="icon" />
                  Likes:{blog.likes.length}
                </div>
                <div className="comment-button" onClick={toggleCommentSection}>
                  <AiOutlineComment className="icon" />
                  Comments:{blog.comments.length}
                </div>
              </div>
            </>
          ))}
          {isCommentVisible && (
            <div className="comment-section">
              <div className="comment-section-form">
                <div className="comment-section-form-input">
                  {error}
                  <textarea
                    placeholder="Enter Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="comment-section-form-button">
                  <button onClick={handleAddComment}>Comment</button>
                </div>
              </div>
              {blogComments.map((blogComment) => (
                <>
                  <div className="comment-section-comments">
                    <div className="comment-section-comment-user">
                      <div className="comment-section-comment-user-profile">
                        <img
                          src={blogComment.user.profilePic}
                          alt={blogComment._id}
                        />
                        <div className="comment-section-comment-user-info">
                          <h3>{blogComment.user.username} </h3>
                        </div>
                      </div>
                      <div className="delete-update-comment">
                        <AiFillDelete
                          style={{ color: "red", fontSize: "20px" }}
                          cursor="pointer"
                          onClick={() => handleDeleteComment(blogComment._id)}
                        />
                        <GrUpdate
                          style={{ color: "green", fontSize: "20px" }}
                          cursor="pointer"
                        />
                      </div>
                    </div>
                    <div className="comment-section-comment">
                      <p>{blogComment.comment} </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Blog;
