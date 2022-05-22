const { salesstatistics } = require("../models/salesstatistics");
const express = require("express");
const router = express.Router();
const multer = require("multer");
require("dotenv/config");

router.get("/", async (req, res) => {
  let salesstatisticsList = await salesstatistics.find();
  console.log(salesstatisticsList);
  if (!salesstatisticsList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(salesstatisticsList);
});

router.get("/:id", async (req, res) => {
  try {
    const salesstatisticsList = await salesstatistics.find({ custName: req.params.id });
    if (!salesstatisticsList) {
      res
        .status(500)
        .json({ message: "The salesstatisticsList with the given ID was not found." });
    }
    res.status(200).send(salesstatisticsList);
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;
