const { Menu } = require("../models/menu");
const express = require("express");
const router = express.Router();
const multer = require("multer");
require("dotenv/config");

router.get("/", async (req, res) => {
    let menuList = await Menu.find();
    console.log(menuList);
    if (!menuList) {
      res.status(500).json({ success: false });
    }
    res.status(200).send(menuList);
  });

router.get("/:id", async (req, res) => {
  try {
    const menuList = await Menu.find({ itemId: req.params.id });
    if (!menuList) {
      res
        .status(500)
        .json({ message: "The menuList with the given ID was not found." });
    }
    res.status(200).send(menuList);
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;
