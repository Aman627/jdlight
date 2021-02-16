const { uuid } = require("uuidv4");
const { connection } = require("../Config/connection");
const Carrer = require("../Models/Carrer");

connection();

const createCarrer = async (req, res, next) => {
  const carrerId = uuid();
  const {
    fname,
    lname,
    jobExperience,
    address,
    qualification,
    emailId,
    contact,
  } = req.body;
  const createdCarrer = new Carrer({
    carrerId,
    fname,
    lname,
    address,
    qualification,
    emailId,
    contact,
    jobExperience,
  });
  try {
    await createdCarrer.save();
  } catch (err) {
    return res.json({
      message: "not able to set your  carrer",
      Error: err,
    });
  }
  return res.status(200).json({
    success: 1,
    message: "thank you for submiting your request we will get to you soon",
  });
};

const getCarrer = async (req, res, next) => {
  const data = await Carrer.find();
  if (data) {
    return res.json({
      success: 1,
      data: data,
    });
  }
  s;
};

exports.createCarrer = createCarrer;
exports.getCarrer = getCarrer;
