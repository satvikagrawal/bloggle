const express = require("express");
const verifyToken = require("../services/auth");
const createBlog = require("../controller/addBlog");
const upload = require("../azuremulter/azuremulter");
const updateBlog = require("../controller/updateBlog");
const likePost = require("../controller/likePost");
const unlikePost = require("../controller/unlikePost");
const addComment = require("../controller/addComment");
const getAllBlog = require("../controller/getAllblog");
const getsSingleBlog = require("../controller/getSingleBlog");
const getComments = require("../controller/getComments");
const deleteComment = require("../controller/deleteComment");

const router = express.Router();

router.post("/addpost", upload.single("thumbnail"), verifyToken, createBlog);
router.put(
  "/updateblog/:blogid",
  upload.single("thumbnail"),
  verifyToken,
  updateBlog
);
router.put("/like/:id", verifyToken, likePost);
router.put("/unlike/:id", verifyToken, unlikePost);
router.put("/addcomment/:id", verifyToken, addComment);
router.get("/getblogs", getAllBlog);
router.get("/getblog/:id", getsSingleBlog);
router.get("/getcomments/:id", getComments);
router.delete("/deletecomment/:id/:commentId", verifyToken, deleteComment);
module.exports = router;
