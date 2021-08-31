const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const competitionSchema = new Schema({
   name: {
      type: String,
      required: true
   },

   date: {
      type: Date
   }, 
   duration: {
      type: Number // hrs
   },
   prize: {
      type: String
   },
   tags: {
      type: [String]
   },
   

   problems: {
      type: [JSON] // {qid, question, answer, points}
   },

   participants: {
      type: [mongoose.Types.ObjectId], // pid
   },

   leaderboard: {
      score: [JSON] // {pid, points, rating}
   },

   company: {
      name: String,
      cid: mongoose.Types.ObjectId
   }
})


module.exports = new mongoose.model("Competition", competitionSchema);