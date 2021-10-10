const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  main_image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shipping: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("product", productSchema);
