const {
  createRecipt,
  getRecipt,
  getReciptByReciptId,
} = require("../Controllers/PaymentReciptController");
const router = require("express").Router();

router.post("/createRecipt", createRecipt);
router.get("/getRecipt", getRecipt);
router.post("/getReciptByReciptId", getReciptByReciptId);

module.exports = router;
