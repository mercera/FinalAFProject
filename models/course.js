const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    coursecode: {
      type: String,
      required: true
    },
    coursename: {
      type: String,
      required: true
    },
    lecturer: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "false"
    }
  },
  { collection: "courses" }
);

module.exports = User = mongoose.model("course", CourseSchema);
