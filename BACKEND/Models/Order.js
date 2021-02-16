const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  date: { type: String, required: true },
  cart: { type: Array, required: true },
  emailId: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  grandTotal: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
