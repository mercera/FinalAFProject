const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    coursename: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duedate: {
      type: String,
      required: true
    }
  },
  { collection: "assignments" }
);

module.exports = Assignment = mongoose.model("assignment", AssignmentSchema);
