const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    default: 100,
  },
  product_id: {
    type: mongoose.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("cart", cartSchema);
