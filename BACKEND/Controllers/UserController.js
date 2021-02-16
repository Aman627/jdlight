const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { uuid } = require("uuidv4");
const { connection } = require("../Config/connection");
const jsonWebToken = require("jsonwebtoken");

const Users = require("../Models/Users");

connection();

const signUp = async (req, res, next) => {
  const salt = genSaltSync(10);
  const userId = uuid();
  const { firstName, lastName, contact, emailId, password } = req.body;
  Users.find({ emailId: emailId }, (error, data) => {
    if (data.length > 0) {
      return res.json({
        success: 0,
        message: "email exists",
      });
    } else {
      const Epassword = hashSync(password, salt);
      const signedUp = new Users({
        userId,
        firstName,
        lastName,
        contact,
        emailId,
        password: Epassword,
      });
      try {
        signedUp.save();
      } catch (err) {
        return res.json({
          message: "not able to signUp",
        });
      }
      res.status(200).json({ success: 1, message: "successfully signedUp" });
    }
  });
};

const login = async (req, res, next) => {
  const { emailId, password } = req.body;
  const data = await Users.findOne({ emailId: emailId });
  if (!data) {
    return res.json({
      success: 0,
      message: "invalid email or password",
    });
  }
  if (data) {
    const result = compareSync(password, data.password);
    if (result) {
      data.password = undefined;
      const Token = jsonWebToken.sign(
        { result: data },
        "deepakjdlight05userltd",
        {
          expiresIn: "7d",
        }
      );
      return res.json({
        success: 1,
        emailId: emailId,
        message: "login successfully",
        token: Token,
      });
    } else {
      return res.json({
        success: 0,
        message: "invalid email or password",
      });
    }
  } else {
    res.json({
      message: "invalid email or passwordd",
    });
  }
};

const getAllUsers = async (req, res, next) => {
  const data = await Users.find();
  if (data) {
    return res.json({
      success: 1,
      data: data,
    });
  }
};

const deleteUser = async (req, res, next) => {
  const { emailId } = req.params;
  const data = await Users.deleteOne({ emailId: emailId });
  if (data) {
    res.json({ success: 1, message: "user delete" });
  } else {
    res.json({ success: 0, message: "user not delete" });
  }
};

const getUserByEmailId = async (req, res, next) => {
  const { emailId } = req.params;
  const data = await Users.findOne({ emailId: emailId });
  if (data) {
    res.json({ success: 1, data: data });
  } else {
    res.json({ success: 0, message: "user not found" });
  }
};

const patchUserByEmailId = async (req, res, next) => {
  const { emailId } = req.params;
  const { address } = req.body;
  const data = await Users.findOneAndUpdate(
    { emailId, emailId },
    { address: address }
  );
  if (data) {
    res.json({ success: 1, data: data });
  } else {
    res.json({ success: 0, message: "user not found" });
  }
};

exports.signUp = signUp;
exports.login = login;
exports.getAllUsers = getAllUsers;
exports.deleteUser = deleteUser;

exports.getUserByEmailId = getUserByEmailId;
exports.patchUserByEmailId = patchUserByEmailId;
