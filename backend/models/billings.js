const mongoose = require("mongoose");
// Claim Schema
const billingsSchema = mongoose.Schema({
    totalPrice: {
    type: Number,
    required: true,
  },
  QRcode: {
    type: String,
    required: true,
  },
  custName: {
    type: String,
    required: true,
  },
  custMobile: {
    type: String,
    required: true,
  },
  cusEmail: {
    type: String,
    required: true,
  },
});
billingsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

billingsSchema.set("toJSON", {
  virtuals: true,
});

exports.billings = mongoose.model("billings", billingsSchema);
