const logger = require("node-color-log");
const company = require("./../models/company");
const Company = require("./../models/company");
const User = require("./../models/user");

exports.create = async(req, res) => {

   logger.info(req.body);
   logger.info(req.user);

   req.body.username = "Something";

   try {
      // @TODO: Improve Security
      let company = await Company.create(req.body);
      if(!company) {
         logger.warn("Company couldn't be created");
         return res.status(500).json({message: "Error"});
      }

      try {
         let user = await User.findOne({_id: req.user._id});
         user.isACompany.isA = true;
         user.isACompany.companyName = company.name;
         user.isACompany.cid = company._id;
         user = await User.updateOne({ _id: user._id}, user);
      } catch(err) {
         logger.warn("User Model Error");
         let company = await Company.deleteOne({_id: company._id});
         return res.status(500).json({message: "Error"});
      }

      res.status(200).send(company);

   } catch(err) {
      logger.warn("Company Model Error");
      logger.error(err);
      res.status(500).json({message: "Error"});
   }
}

exports.getDetails = async(req, res) => {
   try {
      console.log(req.user);
      const user = await User.findOne({_id: req.user._id});
      const details = await Company.findOne({ name: user.isACompany.companyName });
      if(!details) {
         return res.status(500).json({message: "Error"});
      }

      res.status(200).send(details);
   } catch(err) {
      logger.warn("Company Model Error");
      logger.error(err);
      res.status(500).json({message: "Error"});
   }
}

exports.updateDetails = async(req, res) => {
   try {
      const details = Company.updateOne({ name: req.body.name});
      if(!details) {
         return res.status(500).json({message: "Error"});
      }
      res.status(200).send(details);
   } catch(err) {
      logger.warn("Company Model Error");
      logger.error(err);
      res.status(500).json({message: "Error"})
   }
}