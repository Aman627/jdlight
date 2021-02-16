const mongoose = require("mongoose");

const PaymentRecipt = new mongoose.Schema({
  reciptId: { type: String, required: true },
  date: { type: String, required: true },
  emailId: { type: String, required: true },
  PaymentRecipt: { type: Array, required: true },
});

module.exports = mongoose.model("PaymentRecipt", PaymentRecipt);
