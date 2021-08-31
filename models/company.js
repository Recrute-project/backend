var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Company", CompanySchema);
