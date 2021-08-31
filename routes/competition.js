const express = require("express");
const { verifyAuth } = require("./../middleware")
const controller = require("./../controllers/competition");
const router = express.Router();

router.get("/all", controller.getAllCompetitions);

router.post("/create", [verifyAuth], controller.createCompetition);
router.post("/company", [verifyAuth], controller.getCompanyCompetitions);
router.post("/register",[verifyAuth], controller.registerParticipant);
router.post("/submit",[verifyAuth], controller.submitAnswer);

module.exports = router;