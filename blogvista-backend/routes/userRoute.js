const express = require("express");

const userInfo = require("../controller/userInfo");
const verifyToken = require("../services/auth");

const router = express.Router();

router.get("/getuserinfo", verifyToken, userInfo);

module.exports = router;
