const User = require("../models/user");
var jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  console.log(token);
  jwt.verify(token, secret, function (err, log) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    console.log(log);
    req.userId = log._id;
    req.user = log;
    next();
  });
}

module.exports = verifyToken;
