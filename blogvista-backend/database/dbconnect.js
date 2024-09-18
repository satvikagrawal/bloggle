const mongoose = require("mongoose");
const env = require("dotenv");

env.config();
const dbconnection = async () => {
  mongoose
    .connect(process.env.COSMOS_DB_URL)
    .then(() => console.log("Connection to CosmosDB successful"))
    .catch((err) => console.error(err));
};
module.exports = dbconnection;
