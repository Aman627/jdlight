const CarrerController = require("../Controllers/CarrerController");
const router = require("express").Router();

router.post("/setCarrer", CarrerController.createCarrer);
router.get("/getCarrer", CarrerController.getCarrer);

module.exports = router;
