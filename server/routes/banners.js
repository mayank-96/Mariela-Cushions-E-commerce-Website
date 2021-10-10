const express = require("express");
const router = express.Router();

const Banner = require("../models/banner.js");

// ADD BANNER DETAILS
router.post("/", async (req, res) => {
  const banner = new Banner({
    image: req.body.image,
    title: req.body.title,
    body: req.body.body,
    button: req.body.button,
    button_href_id: req.body.button_href_id,
  });
  try {
    const bannerObj = await banner.save();
    res.json(bannerObj);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// FETCH ALL BANNER DETAILS
router.get("/", async (req, res) => {
  try {
    const banner = await Banner.find();
    res.json(banner);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// UPDATE BANNER BY ID
router.patch("/:id", async (req, res) => {
  try {
    let banner = await Banner.findById(req.params.id);
    var keys = Object.keys(req.body);

    function update(i) {
      if (req.body[i] !== "") {
        course[i] = req.body[i];
      }
    }

    keys.forEach(update);

    const bannerObj = await banner.save();
    res.json(bannerObj);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// DELETE BANNER BY ID
router.delete("/:id", async (req, res) => {
  try {
    const bannerObj = await Banner.findByIdAndDelete(req.params.id);
    if (bannerObj) {
      res.json(bannerObj);
    } else {
      res.status(404).send({ message: "ID not found" });
    }
  } catch (err) {
    res.status(404).send({ message: "ID not found" });
  }
});

module.exports = router;
