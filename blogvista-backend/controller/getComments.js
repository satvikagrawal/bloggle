const Blog = require("../database/model/blog");

const getComments = async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate("comments.user")
    .populate({
      path: "comments.user",
      select: {
        blog: 0,
        email: 0,
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    });

  res.status(201).json(blog.comments);
};
module.exports = getComments;
