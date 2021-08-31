const User = require("../models/user");
const Company = require("../models/company");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const crypto = require("crypto");

const secret = process.env.SECRET;

exports.signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(500).send({ message: "Error" });
    }
    const newUser = new User({
      username,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, secret);
    res.status(200).send({ auth: true, token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).send({ message: "Error" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({ message: "Error" });
    }
    const token = jwt.sign({ _id: user._id }, secret);
    res.status(200).send({ auth: true, token });
  } catch (err) {
    res.status(500).send({ message: "Error" });
  }
};

exports.companySignup = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(500).send({ message: "Error" });
    }
    const {
      companyUsername,
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
    } = req.body;
    const company = await Company.findOne({ companyUsername });
    if (company) {
      return res.status(500).send({ message: "Error" });
    }
    const newCompany = new Company({
      companyUsername,
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
    });
    user.isAcompany = {
      isA: true,
      companyName: newCompany.companyName,
      cid: newCompany._id,
    };

    await newCompany.save();
    await user.save();
    res.status(200).send({ message: "Company Registered." });
  } catch (err) {
    res.status(500).send({ message: "Error" });
  }
};
exports.logout = async (req, res) => {
  try {
    res.status(200).send({ auth: false, token: null });
  } catch (err) {
    res.status(500).send({ message: "Error" });
  }
};
