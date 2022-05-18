const { Customers } = require("../models/customer");
const express = require("express");
const router = express.Router();
const multer = require("multer");
require("dotenv/config");

router.get("/", async (req, res) => {
  let customerList = await Customers.find();
  console.log(customerList);
  if (!customerList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(customerList);
});

router.get("/:id", async (req, res) => {
  try {
    const customerList = await Customers.find({ custUsername: req.params.id });
    if (!customerList) {
      res
        .status(500)
        .json({ message: "The customerList with the given ID was not found." });
    }
    res.status(200).send(customerList);
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;
