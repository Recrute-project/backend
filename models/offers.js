var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OfferSchema = new Schema({
  cid: {
    type: String,
  },
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  filters: [String],
  requirements: [String],
  description: {
    type: String,
  },
  salary: {
    type: Number,
  },
  location: {
    type: String,
  },
  experience: {
    type: String,
  },
  position: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companyLogo: {
    type: String,
  },
  material: [String],
  competition: [String],
  forUni: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // applicants: {
  //   type: [mongoose.Types.ObjectId],
  // },
});

module.exports = mongoose.model("Offer", OfferSchema);
