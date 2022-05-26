const mongoose = require("mongoose");
// Claim Schema
const menuSchema = mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
});
menuSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

menuSchema.set("toJSON", {
  virtuals: true,
});

exports.Menu = mongoose.model("menus", menuSchema);
