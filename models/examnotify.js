const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examnotifySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    student: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "false"
    }
  },
  { collection: "examnotify" }
);

module.exports = notifyexam = mongoose.model("examnotify", examnotifySchema);
