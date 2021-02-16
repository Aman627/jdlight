const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const { uuid } = require("uuidv4");
const { connection } = require("../Config/connection");
const Admin = require("../Models/Admin");
const jsonWebToken = require("jsonwebtoken");
connection();

const CreateAdmin = async (req, res, next) => {
  const salt = genSaltSync(10);
  const adminId = uuid();
  const { adminName, adminPassword } = req.body;
  const adminEPassword = hashSync(adminPassword, salt);
  const createdAdmin = new Admin({
    adminId,
    adminName,
    adminPassword: adminEPassword,
  });
  try {
    await createdAdmin.save();
  } catch (err) {
    res.json({
      message: "Admin not created",
      Error: err,
    });
  }
  res.status(200).json({ Admin: createdAdmin });
};

const login = async (req, res, next) => {
  const { adminName, adminPassword } = req.body;
  console.log(adminName + "   " + adminPassword);
  const data = await Admin.findOne({ adminName: adminName });
  if (!data) {
    return res.json({
      success: 0,
      message: "invalid username or password",
    });
  }
  if (data) {
    const result = compareSync(adminPassword, data.adminPassword);
    if (result) {
      data.adminPassword = undefined;
      const Token = jsonWebToken.sign({ result: data }, "deepakjdlight05", {
        expiresIn: "7d",
      });
      return res.json({
        success: 1,
        message: "login successfully",
        token: Token,
      });
    } else {
      return res.json({
        success: 0,
        message: "invalid username or password",
      });
    }
  } else {
    res.json({
      message: "invalid admin name or passwordd",
    });
  }
};

const getAllAdmin = async (req, res, next) => {
  const data = await Admin.find();
  if (data) {
    return res.json({
      success: 1,
      data: data,
    });
  }
};

const deleteAdmin = async (req, res, next) => {
  const { adminId } = req.params;
  const data = await Admin.deleteOne({ adminId: adminId });
  if (data) {
    res.json({ success: 1, message: "admin delete" });
  } else {
    res.json({ success: 0, message: "admin not delete" });
  }
};
exports.CreateAdmin = CreateAdmin;
exports.login = login;
exports.getAllAdmin = getAllAdmin;
exports.deleteAdmin = deleteAdmin;
