const mongoose = require("mongoose");
const { uuid } = require("uuidv4");
const { connection } = require("../Config/connection");
const Products = require("../Models/Products");

connection();

const CreateProduct = async (req, res, next) => {
  const productId = uuid();
  const {
    name,
    price,
    minOrder,
    Wattage,
    color,
    inputVoltage,
    power,
    led,
    body,
    cap,
    category,
    description,
  } = req.body;
  const datas = req.files;
  const images = datas.map(image => {
    return "http://localhost:5000/uploads/" + image.filename;
  });
  const createdProduct = new Products({
    productId,
    name,
    price,
    images,
    minOrder,
    Wattage,
    color,
    inputVoltage,
    power,
    led,
    body,
    cap,
    category,
    description,
  });
  try {
    await createdProduct.save();
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({ success: 1, message: "product added" });
};

const getProduct = (req, res, next) => {
  Products.find({}, (err, products) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ products });
    }
  });
};

const productDelete = async (req, res, next) => {
  const { productId, name } = req.params;
  // const slicedName = name.slice(30);
  // console.log(productId + " & " + name.slice(2));
  const data = await Products.deleteOne({ productId: productId });
  if (data) {
    res.json({ success: 1, message: "product delete" });
  } else {
    res.json({ success: 0, message: "product not deleted" });
  }
};

const getSingleProduct = async (req, res, next) => {
  const { productId } = req.params;
  await Products.find({ productId: productId }, (err, products) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ products });
    }
  });
};

const getCategory = async (req, res, next) => {
  const data = await Products.distinct("category");
  if (data) {
    res.json({ success: 1, data: data });
  } else {
    res.json({ success: 0, message: "category not found" });
  }
};
const getProductByCategory = async (req, res, next) => {
  const { category } = req.params;
  if (category === "All") {
    const data = await Products.find();
    if (data) {
      res.json({ success: 1, data: data });
    } else {
      res.json({ success: 0, message: "category not found" });
    }
  } else {
    const data = await Products.find({ category: category });
    if (data) {
      res.json({ success: 1, data: data });
    } else {
      res.json({ success: 0, message: "category not found" });
    }
  }
};

exports.CreateProduct = CreateProduct;
exports.getProduct = getProduct;
exports.productDelete = productDelete;
exports.getSingleProduct = getSingleProduct;
exports.getCategory = getCategory;
exports.getProductByCategory = getProductByCategory;
