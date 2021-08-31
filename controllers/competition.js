const logger = require("node-color-log");
const Competition = require("./../models/competition");
const User = require("./../models/user");
const { v4: uuid } = require("uuid");

exports.getAllCompetitions = async (req, res) => {
   try {
      let competitions = await Competition.findAll({});
      if(!competitions) {
         return res.status(500).json({message: "Error"});
      }
      res.status(200).send(competitions);
   } catch(err) {
      logger.warn("Competition Model Error");
      logger.error(err);
      res.status(500).json({message: "Error"});
   }
}


exports.getCompanyCompetitions = async(req, res) => {
   let companyName = req.body.company.name;
   let companyID = req.body.company.id;

   try {
      let competitions = null;
      if(companyID) competitions = await Competition.findAll({"company.cid": companyID });
      else {
         competitions = await competitions.findAll({"company.name": companyName});
      }

      if(!competitions) {
         logger.warn("Failed to fetch competitions");
         res.status(500).json({message: "Error"});
      }

      logger.info("Competitions Fetched Successfully")
      res.status(200).send(competitions);

   } catch(err) {
      logger.warn("Competition Model Error");
      logger.error(err);
      res.status(500).json({message: "Error"});
   }
}


exports.createCompetition = async(req, res) => {
   let values = req.body;
   console.log(values);
   values.problems.forEach(element => {
      element.qid = uuid();
      return element;
   });

   try {
      let competition = await Competition.create(req.body);
      if(!competition) {
         return res.status(500).json({message: "Error"});
      }
      console.log("Created");
      console.log(competition);
      res.status(200).send(competition);
   } catch(err) {
      res.status(500).json({message: "Error"});
   }
}

exports.registerParticipant = async(req, res) => {
   let cid = req.body.competition._id;
   let participant = req.user;

   let competition = null;
   let user = null;

   try {
      competition = await Competition.find({_id: cid});
      if(!competition) {
         return res.status(500).json({message: "Error"});
      }
   } catch(err) {
      logger.warn("Competition Model Error")
      logger.error(err);
      return res.status(500).json({message: "Error"});
   }

   try {
      user = await User.find({_id: participant._id});
      if(!user) {
         return res.status(500).json({message: "Error"});
      }
   } catch(err) {
      logger.warn("User Model Error");
      logger.error(err);
      return res.status(500).json({message: "Error"});
   }

   


   // Cross Linking
   try {
      user.competitionJoined.push(competition._id);
      let userResponse = await User.updateOne({_id: user._id}, { $set: {competitionJoined: user.competitionJoined}});
      // if(!userResponse) {
      //    return res.status(500).json({message: "Serious Error"});
      // }

      competition.participants.push(user._id);
      competition.leaderboard.score.push(JSON.parse(`{pid: ${user._id} , points: ${0} }`)); // Newly Registered.
      let competitionResponse = await Competition.updateOne({_id: competition._id}, competition);
      // if(!competitionResponse) {
      //    res.send(500).json({message: "Like WTF"})
      // }

      logger.success("Participant Successfully Registered")
      res.status(200).json({user, competition});

   } catch(err) {
      logger.warn("SOMETHING WENT REEEAALY WRONG");
      logger.error(err);
      return res.status(500).json({message: "Error"});
   }
}


exports.submitAnswer = async (req, res) => {
   // take the answer provided
   // check for the correct solution using the questionid (qid)
   // if soln is correct, update the points with our userid. 
   //    the points scored will be given per problem. rating = (total_time/time_taken*points);
   // return the leaderboard.
   try {
      let value = req.body; // {cid, problem: {qid, question, answer}}
   
      let competition = await Competition.find({_id: value.cid});
      if(!problems) {
         return res.status(500).json("Error");
      }

      // Retriving Problem info
      let submissionProblem = null;
      competition.problems.forEach((element) => {
         if(!submissionProblem && element.qid === value.problem.qid) submissionProblem = element;
         return element;
      })

      //Checking the answer
      if(submissionProblem.answer === value.problem.answer) {
         competition.leaderboard.score.forEach((element) => {
            if(element.pid === value.user._id) {
               element.points += submissionProblem.points;
               element.rating = elements.points // @TODO: Improve the rating method
            }
            return element;
         });

         let competitionResponse = await Competition.updateOne({_id: value.cid}, competition);
         res.status(200).send(competitionResponse);
      }
      else {
         res.status(200).send(competition);
      }

   
   } catch(err) {
      res.status(500).json({message: "BHAG BHENCHODD"});
   }

}