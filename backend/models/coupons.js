const mongoose = require("mongoose");
// Claim Schema
const couponSchema = mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
  },
  couponName: {
    type: String,
    required: true,
  },
  discountAmount: {
    type: Number,
    required: true,
  },
});
couponSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

couponSchema.set("toJSON", {
  virtuals: true,
});

exports.Coupon = mongoose.model("coupon", couponSchema);
