const express = require("express");
const dbconnection = require("./database/dbconnect");
const authRoute = require("./routes/authRoutes.js");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute.js");
const blogRoute = require("./routes/blogRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 8000;
dbconnection();
const app = express();
app.use(bodyParser.json({ extended: true }));
// app.setHeader("Access-Control-Allow-Credentials", "true");

app.use((req, res, next) => {
  // Set CORS headers
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Replace with your frontend domain
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, etc.)

  // Pass to next layer of middleware
  next();
});
// app.use(
//   cors({
//     origin: [
//       // "http://localhost:3000",
//       "https://bloogle-vista.azurewebsites.net",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
