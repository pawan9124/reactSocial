const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    location: {
      country: { type: String },
      state: { type: String },
      city: { type: String }
    },
    travelTrust: {
      type: String
    },
    tours: {
      type: String
    },
    popularity: {
      type: String
    },
    travelCredits: {
      type: String
    },
    markWords: {
      type: String
    },
    social: {
      youtube: {
        type: String
      },
      twitter: {
        type: String
      },
      facebook: {
        type: String
      },
      linkedin: {
        type: String
      },
      instagram: {
        type: String
      }
    }
  },
  { minimize: false }
);

module.exports = Profile = mongoose.model("profile", profileSchema);
