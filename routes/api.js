var express = require("express");
var router = express.Router();
const controller = require("../controllers/api.js");
const { verifyAuth } = require("../middleware");

router.post("/gettext", controller.getpdfdata);
router.get("/user/getuser", [verifyAuth], controller.getuserdata);
router.post("/user/updateuser", [verifyAuth], controller.updateUserData);

module.exports = router;
