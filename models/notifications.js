const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
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
  { collection: "assignmentnotify" }
);

module.exports = notify = mongoose.model("notifications", NotificationSchema);
