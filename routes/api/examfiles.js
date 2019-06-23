const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const ExamFiles = require("../../models/examfiles");

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
    let file = req.files.file1;
    let filename = Date.now() + "-" + file.name;
    let student = req.body.name;
    let exam = req.body.examname;
    let course = req.body.course;

    file.mv("./client/public/examuploads/" + filename, err => {
      if (err) throw err;
    });

    console.log("is not empty");
    name = req.fi;
    const newfile = new ExamFiles({
      filename: filename,
      file: file,
      student: student,
      examname: exam,
      course: course
    });
    console.log(req.files);
    newfile.save().then(data => {
      console.log(data);
    });
  }
});

router.get("/getfiles", (req, res) => {
  ExamFiles.find(function(err, files) {
    if (err) {
      console.log(err);
    } else {
      res.json(files);
    }
  });
});

router.post("/getfilestatus", (req, res) => {
  ExamFiles.find({ student: req.body.student, status: "true" }, function(
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
  ExamFiles.update(
    { _id: ObjectID(req.params.id) },
    { $set: { marks: req.body.marksExam, status: "true" } }
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
  ExamFiles.update(
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
