const { billings } = require("../models/billings");
const express = require("express");
const router = express.Router();
const multer = require("multer");
require("dotenv/config");

router.get("/", async (req, res) => {
  let billingsList = await billings.find();
  console.log(billingsList);
  if (!billingsList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(billingsList);
});

router.get("/:id", async (req, res) => {
  try {
    const billingsList = await billings.find({ custName: req.params.id });
    if (!billingsList) {
      res
        .status(500)
        .json({ message: "The billingsList with the given ID was not found." });
    }
    res.status(200).send(billingsList);
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;
