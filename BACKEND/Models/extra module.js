const mongoose = require("mongoose");

const extraSchema = new mongoose.Schema({
  otherCharges: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  emailId: { type: String, required: true },
  address: { type: String, required: true },
  facebookLink: { type: String, required: true },
  igLink: { type: String, required: true },
  twitterLink: { type: String, required: true },
});

module.exports = mongoose.model("extra", extraSchema);
