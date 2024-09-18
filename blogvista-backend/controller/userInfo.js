const User = require("../database/model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userInfo = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.find({ _id: data.id }).populate("blog");

    res.status(201).json(user);
  } catch (err) {
    return res.json({ err: err.message });
  }
};
// const user = await User.findById(req.params.id);
// if (user) {
module.exports = userInfo;
