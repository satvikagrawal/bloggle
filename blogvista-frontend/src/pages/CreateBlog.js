import React, { useState } from "react";
import Navbar from "../component/Navbar";
import "../styles/createblog.css";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [file, setFile] = useState(null);
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    let blogdata = new FormData();
    blogdata.append("title", postTitle);
    blogdata.append("content", content);
    blogdata.append("thumbnail", file);
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/blog/addpost`, {
      method: "POST",
      body: blogdata,
      credentials: "include",
    });
    if (res.ok) {
      console.log("Blog created Successfully");
      navigate("/dashboard");
    }
  };
  return (
    <>
      <Navbar />
      <div className="create-blog-section">
        <div className="create-blog-heading">
          <h1>What's on your mind?</h1>
        </div>
        <div className="create-blog-form">
          <div className="create-blog-input">
            <div className="create-blog-input-text">
              <p>Blog Title</p>
            </div>
            <div className="create-blog-input-input">
              <input
                type="text"
                placeholder="Enter blog title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="create-blog-input">
            <div className="create-blog-input-text">
              <p>Blog Content</p>
            </div>
            <div className="create-blog-input-input">
              <textarea
                placeholder="Enter the blog content"
                value={content}
                cols={30}
                rows={10}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          <div className="create-blog-input">
            <div className="create-blog-input-text">
              <p>Blog Thumbnail</p>
            </div>
            <div className="create-blog-input-input">
              <input
                type="file"
                accept="image/*"
                name="thumbnail"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <div className="create-blog-button">
            <button onClick={handleCreateBlog}>Create Blog</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBlog;
