const Offer = require("../models/offers");
const User = require("../models/user");
const logger = require("node-color-log");

exports.allOffers = async (req, res) => {
  try {
    const offers = await Offer.find({}, { _id: 0, cid: 0 }).sort({
      createdAt: -1,
    });
    if (!offers) {
      logger.warn("Failed to Receive Offer List");
      return res.status(500).json({ message: "Error" });
    }

    res.status(200).send(offers);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

exports.getParticularOffer = async (req, res) => {
  try {
    const offer = await Offer.findOne({ _id: req.body.oid });
    if (!offer) {
      logger.warn("Search Failed");
      return res.status(500).json({ message: "Error" });
    }

    // Search Successful
    logger.success("Search Complete");
    logger.info(offer);
    res.status(200).send(offer);
  } catch (err) {
    logger.warn("Offer Model Error");
    logger.error(err);
    res.status(500).json({ message: "Error" });
  }
};

exports.createOffer = async (req, res) => {
  console.log(req.body);
  try {
    const data = req.body;
    console.log(data);
    await new Offer(data).save();

    res.status(200).send("seklnf");
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "err" });
  }
};

exports.updateOffer = async (req, res) => {
  try {
    // @TODO: Improve Security
    const offer = await Offer.udpateOne({ _id: req.body.oid }, req.body);
    if (!offer) {
      logger.error("Update Failed");
      return res.status(500).json({ message: "Error" });
    }

    // Updated Successful
    logger.success("Updated Successfully");
    logger.info(offer);
    res.status(200).send(offer);
  } catch (err) {
    logger.warn("Offer Model Error");
    logger.error(err);
    res.status(500).json({ message: "Error" });
  }
};

exports.applyOffer = async (req, res) => {
  try {
    let offer = Offer.findOne({ _id: req.body.offer._id });
    let user = User.findOne({ _id: req.user._id });

    if (!user || !offer) {
      return res.status(500).json({ message: "Error" });
    }

    offer.applicants.push(user._id);
    user.applications.push(offer._id);

    offer = Offer.updateOne({ _id: offer._id }, offer);
    user = User.updateOne({ _id: user._id }, user);

    res.status(200).json({ offer: offer, user: user });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

exports.getOfferApplicants = async (req, res) => {
  try {
    let offer = Offer.findOne({ _id: req.body.offer._id });
    if (!offer) {
      return res.status(500).json({ message: "Error" });
    }
    res.status(200).json({ applicants: offer.applicants });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};
