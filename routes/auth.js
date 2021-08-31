var express = require("express");
var router = express.Router();
const controller = require("../controllers/auth.js");

router.post("/login", controller.login);
router.post("/register", controller.signup);
router.post("/logout", controller.logout);

module.exports = router;
