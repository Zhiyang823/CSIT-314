const mongoose = require("mongoose");
// Claim Schema
const orderSchema = mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  tableNo: {
    type: String,
    required: true,
  },
});
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});

exports.Order = mongoose.model("orders", orderSchema);
