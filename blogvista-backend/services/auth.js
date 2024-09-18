const env = require("dotenv");

const jwt = require("jsonwebtoken");
env.config();

const secret = process.env.TOKEN_KEY;

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false, err });
    } else {
      next();
    }
  });
}
module.exports = verifyToken;
