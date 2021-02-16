const mongoose = require("mongoose");

const carrerSchema = new mongoose.Schema({
  carrerId: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  contact: { type: String, required: true },
  emailId: { type: String, required: true },
  address: { type: String, required: true },
  qualification: { type: String, required: true },
  jobExperience: { type: String, required: true },
});

module.exports = mongoose.model("Carrer", carrerSchema);
