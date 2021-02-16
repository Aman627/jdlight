const {
  AddToCart,
  getCartOfUser,
  DeleteFromCart,
  getIfProductInCart,
  deleteEntierCartByEmail,
} = require("../Controllers/CartController");

const router = require("express").Router();

router.post("/addtocart", AddToCart);
router.get("/getCartOfUser/:emailId", getCartOfUser);
router.delete("/DeleteFromCart/:cartId", DeleteFromCart);
router.get("/getIfProductInCart/:emailId&:name", getIfProductInCart);
router.delete("/deleteEntierCartByEmail/:emailId", deleteEntierCartByEmail);

module.exports = router;
