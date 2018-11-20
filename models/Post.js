const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  images: [
    {
      src: {
        type: String
      }
    }
  ],
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  location: {
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
    }
  },

  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", postSchema);
