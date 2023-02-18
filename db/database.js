const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const database = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = database;
