const express = require("express");
const router = express.Router();

const Cart = require("../models/cart.js");
const Product = require("../models/product.js");

// ADD CART DETAILS
router.post("/", async (req, res) => {
  const cart = new Cart({
    // user_id: req.body.user_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
  });
  try {
    const cartObj = await cart.save();
    res.json(cartObj);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// FETCH ALL CART DETAILS
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find();
    var cart_products = [];
    for (var product in cart) {
      var item = await Product.findById(cart[product].product_id);
      item["quantity"] = cart[product].quantity;
      console.log(item["quantity"]);
      cart_products.push(item);
    }
    res.json(cart_products);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// FETCH CART DETAILS BY FILTER
router.get("/filter/:filters", async (req, res) => {
  try {
    const filter = JSON.parse(req.params.filters);
    const cart = await Cart.find(filter);
    res.json(cart);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// UPDATE CART BY ID
router.patch("/:id", async (req, res) => {
  try {
    let cart = await Cart.findById(req.params.id);
    var keys = Object.keys(req.body);

    function update(i) {
      if (req.body[i] !== "") {
        course[i] = req.body[i];
      }
    }

    keys.forEach(update);

    const cartObj = await cart.save();
    res.json(cartObj);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// DELETE CART BY ID
router.delete("/:id", async (req, res) => {
  try {
    const cartObj = await Cart.findByIdAndDelete(req.params.id);
    if (cartObj) {
      res.json(cartObj);
    } else {
      res.status(404).send({ message: "ID not found" });
    }
  } catch (err) {
    res.status(404).send({ message: "ID not found" });
  }
});

module.exports = router;
