const mongoose = require("mongoose");
// Claim Schema
const restaurantsSchema = mongoose.Schema({
  uniqueCode: {
    type: String,
    required: true,
  },
  QRcode: {
    type: String,
    required: true,
  },
});
restaurantsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

restaurantsSchema.set("toJSON", {
  virtuals: true,
});

exports.restaurants = mongoose.model("restaurants", restaurantsSchema);
