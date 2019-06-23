const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const AssignmentFiles = require("../../models/assignmentfiles");

router.post("/upload", (req, res) => {
  let filename = "file";
  function isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  if (!isEmpty[req.files]) {
    let file = req.files.file;
    let filename = Date.now() + "-" + file.name;
    let student = req.body.name;
    let assignment = req.body.assignmentname;
    let course = req.body.course;

    file.mv("./client/public/uploads/" + filename, err => {
      if (err) throw err;
    });

    console.log("is not empty");
    name = req.fi;
    const newfile = new AssignmentFiles({
      filename: filename,
      file: file,
      student: student,
      assignmentname: assignment,
      course: course
    });
    console.log(req.files);
    newfile.save().then(data => {
      console.log(data);
    });
  }
});

router.get("/getfiles", (req, res) => {
  AssignmentFiles.find(function(err, files) {
    if (err) {
      console.log(err);
    } else {
      res.json(files);
    }
  });
});

router.post("/getfilestatus", (req, res) => {
  AssignmentFiles.find({ student: req.body.student, status: "true" }, function(
    err,
    files
  ) {
    if (err) {
      console.log(err);
    } else {
      res.json(files);
    }
  });
});

router.put("/:id", (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  AssignmentFiles.update(
    { _id: ObjectID(req.params.id) },
    { $set: { marks: req.body.marks, status: "true" } }
  )
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return res.json(err);
    });
});

router.put("/updatestatus/:id", (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  AssignmentFiles.update(
    { _id: ObjectID(req.params.id) },
    { $set: { status: "notified" } }
  )
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return res.json(err);
    });
});

module.exports = router;
