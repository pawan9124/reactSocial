const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const TripSchema = new Schema({
  from: {
    type: Date,
    required: true
  },
  startTime: {
    type: String
  },
  to: {
    type: Date,
    rrequired: true
  },
  endTime: {
    type: String
  },
  start: {
    type: String,
    required: true
  },
  destination: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  join: {
    type: Boolean,
    default: false
  },
  experience: {
    type: String
  }
});

module.exports = User = mongoose.model("trip", TripSchema);
