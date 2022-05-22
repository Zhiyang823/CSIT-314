const { accounts } = require("../models/accounts");
const express = require("express");
const router = express.Router();
const multer = require("multer");
require("dotenv/config");

router.get("/", async (req, res) => {
  let accountsList = await accounts.find();
  console.log(accountsList);
  if (!accountsList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(accountsList);
});

router.get("/:id", async (req, res) => {
  try {
    const accountsList = await accounts.find({ userName: req.params.id });
    if (!accountsList) {
      res
        .status(500)
        .json({ message: "The accountsList with the given ID was not found." });
    }
    res.status(200).send(accountsList);
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;
