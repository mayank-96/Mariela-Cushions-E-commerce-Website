const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("banner", bannerSchema);
