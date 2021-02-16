const OrderController = require("../Controllers/OrderController");
const router = require("express").Router();

router.post("/createOrder", OrderController.createOrder);
router.post("/createCardOrder", OrderController.createCardOrder);
router.post("/verification", OrderController.verification);

router.get("/getOrders", OrderController.getOrders);
router.post("/searchOrders", OrderController.searchOrders);
router.get("/getOrdersByEmail/:emailId", OrderController.getOrdersByEmail);
router.patch(
  "/changeStatusToShipping/:emailId&:orderId",
  OrderController.changeStatusToShipping
);
router.patch(
  "/changeStatusToComplete/:emailId&:orderId",
  OrderController.changeStatusToComplete
);
router.patch("/cancelOrder/:orderId", OrderController.cancelOrder);

module.exports = router;
