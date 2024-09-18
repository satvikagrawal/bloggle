const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ status: true });
};
module.exports = logout;
