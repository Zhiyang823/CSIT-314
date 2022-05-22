const mongoose = require("mongoose");
// Claim Schema
const customersSchema = mongoose.Schema({
  QRcode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tableNumber: {
    type: String,
    required: true,
  },
  couponCode: {
    type: String,
    required: true,
  },
});
customersSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

customersSchema.set("toJSON", {
  virtuals: true,
});

exports.Customers = mongoose.model("customers", customersSchema);
