const mongoose = require("mongoose");
// Claim Schema
const accountsSchema = mongoose.Schema({
    userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
accountsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

accountsSchema.set("toJSON", {
  virtuals: true,
});

exports.accounts = mongoose.model("accounts", accountsSchema);
