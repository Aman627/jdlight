const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  cartId: { type: String, required: true },
  image: { type: String, required: true },
  emailId: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: String, requied: true },
  price: { type: String, requied: true },
  total: { type: String, requied: true },
});

module.exports = mongoose.model("Cart", CartSchema);
