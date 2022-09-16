const mongoose = require("mongoose");

const Youtube = mongoose.model("Youtube", {
  title: String,
  time: String,
  user: String,
  followers: String,
});

module.exports = Youtube;
