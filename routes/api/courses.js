const express = require("express");
const router = express.Router();

const Course = require("../../models/course");

router.post("/addCourse", (req, res) => {
  const newcourse = new Course({
    coursecode: req.body.coursecode,
    coursename: req.body.coursename,
    lecturer: req.body.lecturer
  });
  newcourse.save();
});

router.post("/getCourses", (req, res) => {
  Course.find({ lecturer: req.body.name, status: "false" }, function(
    err,
    courses
  ) {
    if (err) {
      res.json(err);
    } else {
      console.log(courses);
      res.json(courses);
    }
  });
});

router.post("/getCoursestrue", (req, res) => {
  Course.find({ lecturer: req.body.name, status: "true" }, function(
    err,
    courses
  ) {
    if (err) {
      res.json(err);
    } else {
      console.log(courses);
      res.json(courses);
    }
  });
});

router.post("/getCoursestrue", (req, res) => {
  Course.find({ lecturer: req.body.name, status: "true" }, function(
    err,
    courses
  ) {
    if (err) {
      res.json(err);
    } else {
      console.log(courses);
      res.json(courses);
    }
  });
});

router.post("/getCoursestruejoin", (req, res) => {
  Course.find({ status: "true" }, function(err, courses) {
    if (err) {
      res.json(err);
    } else {
      console.log(courses);
      res.json(courses);
    }
  });
});

router.put("/:id", (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  Course.update(
    { _id: ObjectID(req.params.id) },
    { $set: { status: req.body.status } }
  )
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return res.json(err);
    });
});

module.exports = router;
