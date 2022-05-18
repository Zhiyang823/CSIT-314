const mongoose = require("mongoose");
// Claim Schema
const menuSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  itemId: {
    type: String,
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
