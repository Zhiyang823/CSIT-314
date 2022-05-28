const { Coupon } = require("../models/coupons");
const express = require("express");
const router = express.Router();
const multer = require("multer");
require("dotenv/config");

router.get("/", async (req, res) => {
    let couponList = await Coupon.find();
    console.log(couponList);
    if (!couponList) {
      res.status(500).json({ success: false });
    }
    res.status(200).send(couponList);
  });

router.get("/:id", async (req, res) => {
  try {
    const couponList = await Coupon.find({ couponName: req.params.id });
    if (!couponList) {
      res
        .status(500)
        .json({ message: "The couponList with the given ID was not found." });
    }
    res.status(200).send(couponList);
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;
