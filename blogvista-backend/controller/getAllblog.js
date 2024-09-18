const Blog = require("../database/model/blog");

const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({})
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
      })
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};
module.exports = getAllBlog;
