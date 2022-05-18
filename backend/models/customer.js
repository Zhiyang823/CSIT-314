const mongoose = require("mongoose");
// Claim Schema
const customersSchema = mongoose.Schema({
  custName: {
    type: String,
    required: true,
  },
  custPassword: {
    type: String,
    required: true,
  },
  custUsername: {
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
