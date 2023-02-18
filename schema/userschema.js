const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = usersModel = new mongoose.model("User", userSchema);
