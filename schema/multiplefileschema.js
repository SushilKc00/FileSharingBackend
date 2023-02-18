const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    filename: [Object],
    uuid: { type: String, required: true },
    sender: { type: String, required: false },
    receiver: { type: String, required: false },
  },
  { timestamps: true }
);

const multiplefile = new mongoose.model("multiplefile", schema);

module.exports = multiplefile;
