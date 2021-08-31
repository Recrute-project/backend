const User = require("../models/user");
var jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

async function verifyCompany(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    if (!user.isACompany)
      return res.status(500).send({ auth: false, message: "Unauthorized." });
    if (user.isACompany.isA) next();
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = verifyCompany;
