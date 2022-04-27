const { Order } = require("../models/order");
const express = require("express");
const router = express.Router();
const multer = require("multer");
require("dotenv/config");

router.get("/", async (req, res) => {
  let orderList = await Order.find();
  console.log(orderList);
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(orderList);
});

router.get("/:id", async (req, res) => {
  try {
    const orderList = await Order.find({ orderId: req.params.id });
    if (!orderList) {
      res
        .status(500)
        .json({ message: "The orderList with the given ID was not found." });
    }
    res.status(200).send(orderList);
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});
