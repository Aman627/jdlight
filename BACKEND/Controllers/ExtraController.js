const { connection } = require("../Config/connection");
const extra = require("../Models/extra module");
const createExtra = async (req, res, next) => {
  const {
    otherCharges,
    mobileNumber,
    emailId,
    address,
    facebookLink,
    igLink,
    twitterLink,
  } = req.body;
  const createdExtra = new extra({
    otherCharges,
    mobileNumber,
    emailId,
    address,
    facebookLink,
    igLink,
    twitterLink,
  });
  try {
    await createdExtra.save();
  } catch (err) {
    return res.json({ success: 0, message: "not created", error: err });
  }
  res.json({ success: 1, message: "created" });
};
const patchExtra = async (req, res, next) => {
  const {
    otherCharges,
    mobileNumber,
    emailId,
    address,
    facebookLink,
    igLink,
    twitterLink,
  } = req.body;

  const data = await extra.findOneAndUpdate({
    otherCharges: otherCharges,
    mobileNumber: mobileNumber,
    emailId: emailId,
    address: address,
    facebookLink: facebookLink,
    igLink: igLink,
    twitterLink: twitterLink,
  });
  if (data) {
    res.json({ success: 1, data: data });
  } else {
    res.json({ success: 0, message: "user not found" });
  }
};
const getExtra = async (req, res, next) => {
  const data = await extra.find();
  if (data) {
    res.json({ success: 1, data: data });
  } else {
    res.json({ success: 0, message: "user not found" });
  }
};
exports.createExtra = createExtra;
exports.patchExtra = patchExtra;
exports.getExtra = getExtra;
