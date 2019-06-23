const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: null
    },
    courses: {
      type: Array,
      default: null
    }
  },
  { collection: "users" }
);

module.exports = User = mongoose.model("user", UserSchema);
