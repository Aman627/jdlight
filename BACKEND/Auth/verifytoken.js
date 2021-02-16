const jsonWebToken = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    jsonWebToken.verify(token, "deepakjdlight05", (err, decoded) => {
      if (err) {
        res.json({
          success: 0,
          message: "invaid token",
        });
      } else {
        next();
      }
    });
  } else {
    res.json({
      success: 0,
      message: "access denied",
    });
  }
};

exports.checkToken = checkToken;
