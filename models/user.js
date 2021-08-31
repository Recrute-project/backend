var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  applications: {
    type: [mongoose.Types.ObjectId],
  },
  competitionJoined: [mongoose.Types.ObjectId],
  isACompany: {
    isA: {
      type: Boolean,
      default: false,
    },
    companyName: {
      type: String,
      default: "",
    },
    cid: {
      type: String,
      default: "",
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
