const express = require("express");

const router = express.Router();
const Assignment = require("../../models/assignment");

router.get("/", (req, res) => {
  Assignment.find(function(err, assignments) {
    if (err) {
      console.log(err);
    } else {
      res.json(assignments);
    }
  });
});

router.post("/course", (req, res) => {
  Assignment.find({ coursename: req.body.name }, function(err, assignments) {
    if (err) {
      console.log(err);
    } else {
      res.json(assignments);
    }
  });
});

router.post("/", (req, res) => {
  const newAssignment = new Assignment({
    name: req.body.name,
    coursename: req.body.coursename,
    description: req.body.description,
    duedate: req.body.date
  });

  newAssignment
    .save()
    .then(response => {
      res
        .status(200)
        .json({ assignmentSaved: "Assignment added successfully" });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

router.put("/:id", (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  Assignment.update(
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
