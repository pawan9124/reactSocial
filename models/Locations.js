const mongoose = require("mongoose");

//Create Schema
const LocationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  state: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  views: {
    type: Number
  }
});

module.exports = Locations = mongoose.model("locations", LocationSchema);
