const ProductController = require("../Controllers/ProductController");
const router = require("express").Router();
const multer = require("multer");
const { checkToken } = require("../Auth/verifytoken");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toString().replace(/:/g, "-") + "jdlight" + file.originalname
    );
  },
});
const upload = multer({ storage: storage });

router.post(
  "/createProduct",
  upload.array("images", 6),
  ProductController.CreateProduct
);
router.get("/products", ProductController.getProduct);
router.delete("/products/:productId&:name", ProductController.productDelete);
router.get("/products/:productId", ProductController.getSingleProduct);
router.get("/getCategory", ProductController.getCategory);
router.get(
  "/getProductByCategory/:category",
  ProductController.getProductByCategory
);

module.exports = router;
