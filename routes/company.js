const express = require("express")
const controller = require("../controllers/company");
const {verifyAuth} = require("../middleware")
const router = express.Router();

router.post("/create" ,[verifyAuth] , controller.create);
router.get("/get",[verifyAuth], controller.getDetails);
router.post("/update",[verifyAuth], controller.updateDetails);

module.exports = router;