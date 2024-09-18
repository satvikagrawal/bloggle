const Blog = require("../database/model/blog");

const getsSingleBlog = async (req, res) => {
  const blogs = await Blog.find({ _id: req.params.id })
    .populate(["likes.user", "comments.user"])
    .populate({
      path: "createdBy",
      select: {
        _id: 0,
        blog: 0,
        email: 0,
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    });
  res.status(200).json(blogs);
};
module.exports = getsSingleBlog;
