const { connection } = require("../Config/connection");
const PaymentRecipt = require("../Models/PaymentRecipt");

connection();

const createRecipt = async (req, res, next) => {
  const { reciptId, emailId } = req.body;
  const createdRecipt = new PaymentRecipt({
    reciptId,
    emailId,
  });
  try {
    await createdRecipt.save();
  } catch (err) {
    return res.json({ success: 0, message: "recipt not created", error: err });
  }
  return res.json({ success: 0, message: "recipt created" });
};

const getRecipt = async (req, res, next) => {
  const data = await PaymentRecipt.find({}).sort({ date: -1 });
  if (data) {
    res.json({ success: 1, data: data });
  } else {
    res.json({ success: 0, message: "No recipt found" });
  }
};

const getReciptByReciptId = async (req, res, next) => {
  const { reciptId } = req.body;
  const data = await PaymentRecipt.find({ reciptId: reciptId });
  if (data) {
    res.json({ success: 1, data: data });
  } else {
    res.json({ success: 0, message: "No recipt found" });
  }
};
exports.createRecipt = createRecipt;
exports.getRecipt = getRecipt;
exports.getReciptByReciptId = getReciptByReciptId;
