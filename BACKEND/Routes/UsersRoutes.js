const UserController = require("../Controllers/UserController");
const router = require("express").Router();

router.post("/signUp", UserController.signUp);
router.post("/login", UserController.login);
router.get("/users", UserController.getAllUsers);
router.delete("/:emailId", UserController.deleteUser);
router.get("/users/:emailId", UserController.getUserByEmailId);
router.patch("/users/:emailId", UserController.patchUserByEmailId);

module.exports = router;
