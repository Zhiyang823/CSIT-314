const mongoose = require("mongoose");
// Claim Schema
const salesstatisticsSchema = mongoose.Schema({
    custName: {
    type: String,
    required: true,
  },
  custMobile: {
    type: String,
    required: true,
  },
  custEmail: {
    type: String,
    required: true,
  },
});
salesstatisticsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

salesstatisticsSchema.set("toJSON", {
  virtuals: true,
});

exports.salesstatistics = mongoose.model("salesstatistics", salesstatisticsSchema);
