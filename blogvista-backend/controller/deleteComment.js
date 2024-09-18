const Blog = require("../database/model/blog");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const deleteComment = async (req, res) => {
  const token = req.cookies.token;
  const blogId = req.params.id;
  const commentId = req.params.commentId;
  if (!token) {
    return res.json({ status: false });
  }
  const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

  const userId = verifiedUser.id;
  const blog = await Blog.findById(blogId);

  const comment = blog.comments.find(
    (comment) => comment._id.toString() === commentId
  );

  if (comment.user.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Permission denied" });
  }
  blog.comments = blog.comments.filter(
    (comment) => comment._id.toString() !== commentId
  );
  await blog.save();
  res.json({ message: "Comment deleted successfully" });
};
module.exports = deleteComment;
