const mongoose = require("mongoose");
// Claim Schema
const customersSchema = mongoose.Schema({
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
  tableNo: {
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
