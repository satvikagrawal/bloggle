const Blog = require("../database/model/blog");
const unlikePost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.body.userId)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }
    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.body.userId);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(400).json({ msg: "Bad Request" });
  }
};
module.exports = unlikePost;
