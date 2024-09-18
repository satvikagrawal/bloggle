const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    blog: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
const user = mongoose.model("users", userSchema);
module.exports = user;
