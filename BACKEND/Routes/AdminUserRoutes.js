const { checkToken } = require("../Auth/verifytoken");
const {
  CreateAdmin,
  login,
  getAllAdmin,
  deleteAdmin,
} = require("../Controllers/AdminController");

const router = require("express").Router();

router.post("/signUp", CreateAdmin);
router.post("/login", login);
router.get("/getAllAdmin", getAllAdmin);
router.delete("/deleteAdmin/:adminId", deleteAdmin);

module.exports = router;
