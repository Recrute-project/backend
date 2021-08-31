const express = require("express");
const {verifyAuth} = require("./../middleware");
const controller = require("./../controllers/offer");
const router = express.Router();

router.get("/all", controller.allOffers);
router.post("/create", [verifyAuth], controller.createOffer);
router.post("/get",[verifyAuth], controller.getParticularOffer);
router.post("/apply", [verifyAuth], controller.applyOffer);
router.post("/updateoffer",[verifyAuth], controller.updateOffer);
router.post("/getapplicants",[verifyAuth], controller.getOfferApplicants);

// router.post("/updateOffer",[verifyAuth], controller.);

module.exports = router;