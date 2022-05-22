const { restaurants } = require("../models/restaurants");
const express = require("express");
const router = express.Router();
const multer = require("multer");
require("dotenv/config");

router.get("/", async (req, res) => {
  let restaurantsList = await restaurants.find();
  console.log(restaurantsList);
  if (!restaurantsList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(restaurantsList);
});

router.get("/:id", async (req, res) => {
  try {
    const restaurantsList = await restaurants.find({ uniqueCode: req.params.id });
    if (!restaurantsList) {
      res
        .status(500)
        .json({ message: "The restaurantsList with the given ID was not found." });
    }
    res.status(200).send(restaurantsList);
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;
