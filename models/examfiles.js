const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamFilesSchema = new Schema(
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
    examname: {
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
  { collection: "examfiles" }
);

module.exports = ExamFile = mongoose.model("examfile", ExamFilesSchema);
