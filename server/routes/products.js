const express = require("express");
const router = express.Router();

const Product = require("../models/product.js");

// ADD PRODUCT DETAILS
router.post("/", async (req, res) => {
  const product = new Product({
    main_image: req.body.main_image,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    images: req.body.images,
  });
  try {
    const productObj = await product.save();
    res.json(productObj);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// FETCH ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// FETCH SIMILAR PRODUCTS
router.get("/similar/:id", async (req, res) => {
  try {
    const product = await Product.find();
    const products = product.filter(
      (data) => req.params.id !== data._id.toString()
    );
    // Shuffle array
    const shuffled = products.sort(() => 0.5 - Math.random());
    res.json(shuffled.slice(0, 3));
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// FETCH PRODUCT BY ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// UPDATE PRODUCT BY ID
router.patch("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    var keys = Object.keys(req.body);

    function update(i) {
      if (req.body[i] !== "") {
        course[i] = req.body[i];
      }
    }

    keys.forEach(update);

    const productObj = await product.save();
    res.json(productObj);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// DELETE PRODUCT BY ID
router.delete("/:id", async (req, res) => {
  try {
    const productObj = await Product.findByIdAndDelete(req.params.id);
    if (productObj) {
      res.json(productObj);
    } else {
      res.status(404).send({ message: "ID not found" });
    }
  } catch (err) {
    res.status(404).send({ message: "ID not found" });
  }
});

module.exports = router;
