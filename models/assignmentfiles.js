const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignFileSchema = new Schema(
  {
    filename: {
      type: String
    },
    file: {
      data: Buffer,
      contentType: String
    },
    student: {
      type: String
    },
    assignmentname: {
      type: String
    },
    course: {
      type: String
    },
    marks: {
      type: Number,
      default: null
    },
    status: {
      type: String,
      default: "false"
    }
  },
  { collection: "assignmentfiles" }
);

module.exports = AssignmentFile = mongoose.model(
  "assignmentfile",
  AssignFileSchema
);
