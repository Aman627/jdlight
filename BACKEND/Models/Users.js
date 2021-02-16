const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: { type: String, required: true },
  emailId: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
});

module.exports = mongoose.model("Users", UserSchema);
