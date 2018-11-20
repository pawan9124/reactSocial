const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ZipcodeSchema = new Schema({
  zipcode: [
    {
      type: String
    }
  ]
});

module.exports = Post = mongoose.model("zipcode", ZipcodeSchema);
