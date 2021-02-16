const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  adminName: { type: String, required: true },
  adminPassword: { type: String, required: true },
});

module.exports = mongoose.model("Admins", AdminSchema);
