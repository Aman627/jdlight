const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  images: { type: Array, required: true },
  minOrder: { type: String, required: true },
  Wattage: { type: String },
  color: { type: String },
  inputVoltage: { type: String },
  power: { type: String },
  led: { type: String },
  body: { type: String },
  cap: { type: String },
  category: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Products", ProductSchema);
