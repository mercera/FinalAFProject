const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const users = require("./routes/api/users");
const courses = require("./routes/api/courses");
const assignments = require("./routes/api/assignments");
const assignmentfiles = require("./routes/api/assignmentfiles");
const exams = require("./routes/api/exams");
const examfiles = require("./routes/api/examfiles");
const notifications = require("./routes/api/notifications");
const examnotifications = require("./routes/api/examnotify");

const app = express();
app.use(fileUpload());
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB succesfully connected"))
  .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/courses", courses);
app.use("/api/assignments", assignments);
app.use("/api/assignmentfiles", assignmentfiles);
app.use("/api/exams", exams);
app.use("/api/examfiles", examfiles);
app.use("/api/notifications", notifications);
app.use("/api/examnotify", examnotifications);

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
