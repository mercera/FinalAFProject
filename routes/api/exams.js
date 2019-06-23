const express = require("express");
const router = express.Router();

const Exam = require("../../models/exam");

router.post("/addExam", (req, res) => {
  const newexam = new Exam({
    examname: req.body.examname,
    coursename: req.body.coursename,
    description: req.body.description,
    duedate: req.body.duedate
  });
  newexam.save();
});

router.get("/getExams", (req, res) => {
  Exam.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post("/course", (req, res) => {
  Exam.find({ coursename: req.body.name }, function(err, exams) {
    if (err) {
      console.log(err);
    } else {
      res.json(exams);
    }
  });
});

router.put("/:id", (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  Exam.update(
    { _id: ObjectID(req.params.id) },
    { $set: { duedate: req.body.duedate } }
  )
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return res.json(err);
    });
});

module.exports = router;
