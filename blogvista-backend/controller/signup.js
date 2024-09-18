const User = require("../database/model/user");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../tokenGeneration/generateToken");

const handleSignUp = async (req, res) => {
  try {
    const image = req.file ? req.file.url.split("?")[0] : null;
    if (
      !(
        req.body.email &&
        req.body.password &&
        req.body.firstname &&
        req.body.lastname
      )
    ) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email: req.body.email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profilePic: image,
    });
    const user = await newUser.save();
    const token = createSecretToken(user._id);

    // res.cookie("token", token, {
    //   domain: "bloogle-vista.azurewebsites", // Set your domain here
    //   path: "/", // Cookie is accessible from all paths
    //   expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
    //   secure: true, // Cookie will only be sent over HTTPS
    //   httpOnly: true, // Cookie cannot be accessed via client-side scripts
    //   sameSite: "None",
    // });
    res.cookie("token", token, {
      domain: process.env.FRONTENT_DOMAIN,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    console.log("cookie set succesfully");

    res.json(user);
  } catch (error) {
    console.log("Gott an error", error);
  }
};
module.exports = handleSignUp;
