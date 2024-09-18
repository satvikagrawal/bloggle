const Blog = require("../database/model/blog");

const updateBlog = async (req, res) => {
  const image = req.file ? req.file.url : null;
  const blogId = req.params.blogid;

  // Validate req.body and req.params
  console.log(req.body);
  if (
    !req.body ||
    !req.body.title ||
    !req.body.content ||
    !req.params ||
    !req.params.blogid
  ) {
    return res.status(400).json("Invalid request");
  }

  let blog;
  try {
    blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json("Blog not found");
    }
  } catch (error) {
    return res.status(500).json("Error finding blog");
  }

  const updatedBlog = {
    title: req.body.title || blog.title,
    content: req.body.content || blog.content,
    blogThumbnail: image || blog.blogThumbnail,
  };

  try {
    blog = await Blog.findByIdAndUpdate(blogId, updatedBlog, { new: true });
    res.status(200).json({ "Blog Updated Successfully": blog });
  } catch (error) {
    res.status(500).json("Error updating blog");
  }
};
module.exports = updateBlog;
