const { uuid } = require("uuidv4");
const { connection } = require("../Config/connection");
const Order = require("../Models/Order");
const Cart = require("../Models/Cart");
const PaymentRecipt = require("../Models/PaymentRecipt");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
connection();

const razorpay = new Razorpay({
  key_id: "rzp_test_brndJrJYu0ukPF",
  key_secret: "6WB0M1k78sT3MASiXdgtDewf",
});

const createCardOrder = async (req, res, next) => {
  const { orderId, emailId, address, paymentMethod } = req.body;
  const status = "pending";
  const extraCharges = 250;
  const cart = await Cart.find({ emailId: emailId });
  const total = cart.map(val => parseInt(val.total));
  let totalOfCart = total.reduce((acc, cv) => {
    return acc + cv;
  }, 0);
  let grandTotal = totalOfCart + extraCharges;
  const createdOrder = new Order({
    orderId,
    date: Date().toString(),
    cart,
    address,
    paymentMethod,
    emailId,
    grandTotal,
    status,
  });

  try {
    await createdOrder.save();
  } catch (err) {
    return res.json({
      message: "order was not place",
    });
  }
  res.status(200).json({ success: 1, message: "order successfull" });
};
const createOrder = async (req, res, next) => {
  const { emailId, address, paymentMethod } = req.body;
  const orderId = uuid();
  const status = "pending";
  const extraCharges = 250;
  const cart = await Cart.find({ emailId: emailId });
  const total = cart.map(val => parseInt(val.total));
  let totalOfCart = total.reduce((acc, cv) => {
    return acc + cv;
  }, 0);
  let grandTotal = totalOfCart + extraCharges;
  if (paymentMethod === "card") {
    //for card payment method
    const payment_capture = 1;

    const currency = "INR";
    const options = {
      amount: grandTotal * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.json({
        id: response.id,
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    //for COD payment method
    const createdOrder = new Order({
      orderId,
      date: Date().toString(),
      cart,
      address,
      paymentMethod,
      emailId,
      grandTotal,
      status,
    });

    try {
      await createdOrder.save();
    } catch (err) {
      return res.json({
        message: "order was not place",
      });
    }
    res.status(200).json({ success: 1, message: "order successfull" });
  }
};

const verification = async (req, res, next) => {
  // N9qKNai1EZAYl1wAYT8TKb4dmgoWNcllFnp3SwjGs
  const secret = "N9qKNai1EZAYl1wAYT8TKb4dmgoWNcllFnp3SwjG";
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    if (req.body.event === "payment.captured") {
      const emailId = req.body.payload.payment.entity.description;
      const reciptId = req.body.payload.payment.entity.order_id;
      const createdRecipt = new PaymentRecipt({
        reciptId,
        date: Date().toString(),
        emailId,
        PaymentRecipt: req.body,
      });
      try {
        await createdRecipt.save();
      } catch {
        return res.json({
          message: "recipt not created",
        });
      }
      return res.status(200).json({ message: "recipt created" });
    } else {
      const emailId = req.body.payload.payment.entity.description;
      const reciptId = req.body.payload.payment.entity.order_id;
      const createdRecipt = new PaymentRecipt({
        reciptId,
        date: Date().toString(),
        emailId,
        PaymentRecipt: req.body,
      });
      try {
        await createdRecipt.save();
      } catch {
        return res.json({
          message: "recipt not created",
        });
      }
      return res.status(200).json({ message: "recipt created" });
    }
  } else {
    console.log("not valid");
  }
  return res.json({ status: "ok" });
};

const getOrders = async (req, res, next) => {
  const data = await Order.find().sort({ date: -1 });
  if (data) {
    return res.json({ success: 1, data: data });
  } else {
    return res.json({ success: 1, message: "no order placed yet" });
  }
};

const searchOrders = async (req, res, next) => {
  const { emailId, orderId, status } = req.body;
  let data = "";
  if (emailId && orderId && status) {
    data = await Order.find({
      emailId: emailId,
      orderId: orderId,
      status: status,
    });
  } else {
    if (emailId && orderId) {
      data = await Order.find({ emailId: emailId, orderId: orderId });
    } else if (orderId && status) {
      data = await Order.find({ orderId: orderId, status: status });
    } else if (emailId && status) {
      data = await Order.find({ emailId: emailId, status: status });
    } else {
      if (emailId) {
        data = await Order.find({ emailId: emailId });
      } else if (orderId) {
        data = await Order.find({ orderId: orderId });
      } else {
        data = await Order.find({ status: status });
      }
    }
  }
  if (data) {
    return res.json({ success: 1, data: data });
  } else {
    return res.json({ success: 0, message: "no record found" });
  }
};

const getOrdersByEmail = async (req, res, next) => {
  const { emailId } = req.params;
  const data = await Order.find({ emailId: emailId }).sort({ date: -1 });
  if (data) {
    return res.json({ success: 1, data: data });
  } else {
    return res.json({ success: 1, message: "no order placed yet" });
  }
};

const changeStatusToShipping = async (req, res, next) => {
  const { orderId, emailId } = req.params;
  const status = "shipping";
  const data = await Order.findOneAndUpdate(
    { emailId: emailId, orderId: orderId },
    { status: status }
  );
  if (data) {
    res.json({ success: 1, message: "Order status is shipping" });
  } else {
    res.json({ success: 0, message: "Order Not found" });
  }
};

const changeStatusToComplete = async (req, res, next) => {
  const { orderId, emailId } = req.params;
  const status = "completed";
  const data = await Order.findOneAndUpdate(
    { emailId: emailId, orderId: orderId },
    { status: status }
  );
  if (data) {
    res.json({ success: 1, message: "Order status is Complete" });
  } else {
    res.json({ success: 0, message: "Order Not found" });
  }
};

const cancelOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const status = "cancelled";
  const data = await Order.findOneAndUpdate(
    { orderId: orderId },
    { status: status }
  );
  if (data) {
    res.json({ success: 1, message: "Order was cancelled by you" });
  } else {
    res.json({ success: 0, message: "no order found" });
  }
};

exports.createOrder = createOrder;
exports.getOrders = getOrders;
exports.getOrdersByEmail = getOrdersByEmail;
exports.changeStatusToShipping = changeStatusToShipping;
exports.changeStatusToComplete = changeStatusToComplete;
exports.cancelOrder = cancelOrder;
exports.verification = verification;
exports.createCardOrder = createCardOrder;
exports.searchOrders = searchOrders;
