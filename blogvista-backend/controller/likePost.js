const Blog = require("../database/model/blog");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const likePost = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ status: false });
    }
    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

    const userId = verifiedUser.id;
    const post = await Blog.findById(req.params.id);
    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === userId).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: userId });

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = likePost;
