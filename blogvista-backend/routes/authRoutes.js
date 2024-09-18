const express = require("express");
const handleSignUp = require("../controller/signup");
const upload = require("../azuremulter/azuremulter");
const login = require("../controller/login");

const router = express.Router();

router.post("/signup", upload.single("img"), handleSignUp);
router.post("/login", login);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
module.exports = router;
