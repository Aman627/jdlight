const { uuid } = require("uuidv4");
const { connection } = require("../Config/connection");
const Cart = require("../Models/Cart");

connection();

const AddToCart = async (req, res, next) => {
  const { emailId, name, quantity, price, total, image } = req.body;
  const cartId = uuid();
  Cart.find({ emailId: emailId, name: name }, (error, data) => {
    if (data.length > 0) {
      return res.json({
        success: 0,
        message: "already added to cart",
      });
    } else {
      const AddedToCart = new Cart({
        cartId,
        emailId,
        image,
        name,
        quantity,
        price,
        total,
      });
      try {
        AddedToCart.save();
      } catch (err) {
        res.json({
          message: "Not added to Cart",
          Error: err,
        });
      }
      res.status(200).json({ Cart: AddedToCart });
    }
  });
};

const getCartOfUser = async (req, res, next) => {
  const { emailId } = req.params;
  const data = await Cart.find({ emailId: emailId });
  if (data.length > 0) {
    res.json({ success: 1, data: data });
  } else {
    res.json({ success: 0, data: 0, message: "add somthing in cart" });
  }
};

const deleteEntierCartByEmail = async (req, res, next) => {
  const { emailId } = req.params;
  const data = await Cart.deleteMany({ emailId: emailId });
  if (data) {
    res.json({ success: 1, message: "cart clear" });
  } else {
    res.json({ success: 0, data: 0, message: "noting in cart" });
  }
};

const getIfProductInCart = async (req, res, next) => {
  const { emailId, name } = req.params;
  const data = await Cart.find({ emailId: emailId, name: name });
  if (data.length > 0) {
    return res.send(true);
  } else {
    return res.send(false);
  }
};

const DeleteFromCart = async (req, res, next) => {
  const { cartId } = req.params;
  const data = await Cart.deleteOne({ cartId: cartId });
  if (data) {
    res.json({ success: 1, message: "cart delete" });
  } else {
    res.json({ success: 0, message: "not deleted from cart" });
  }
};

exports.AddToCart = AddToCart;
exports.getCartOfUser = getCartOfUser;
exports.getIfProductInCart = getIfProductInCart;
exports.DeleteFromCart = DeleteFromCart;
exports.deleteEntierCartByEmail = deleteEntierCartByEmail;
