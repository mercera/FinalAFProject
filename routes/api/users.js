const express = require("express");
const mailservice = require("../../mailservice/transporter");
const router = express.Router();

const User = require("../../models/user");

router.post("/", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });

      newUser.save().then(user => res.json(user));
    }
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      if (user.password == req.body.password) {
        return res.status(200).send(user);
      } else {
        return res.status(400).json({ fail: "Incorrect Password" });
      }
    } else {
      return res.status(400).json({ email: "email does not exist" });
    }
  });
});

router.get("/admin", (req, res) => {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.get("/admincou", (req, res) => {
  User.find({ role: "Instructor" }, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post("/notify", (req, res) => {
  User.find({ courses: req.body.course }, function(err, students) {
    if (err) {
      console.log(err);
    } else {
      res.json(students);
    }
  });
});

router.put("/:id", (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  User.update(
    { _id: ObjectID(req.params.id) },
    { $set: { role: req.body.role } }
  )
    .then(data => {
      if (req.body.role === "Instructor") {
        var mail = {
          from: "Admin",
          to: req.body.email,
          subject: "Assignment as Instructor",
          text: "You have been appointed as an Instructor"
        };

        mailservice.sendMail(mail, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
      return res.json(data);
    })
    .catch(err => {
      return res.json(err);
    });
});

router.put("/joincourse/:id", (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  User.update(
    { _id: ObjectID(req.params.id) },
    { $set: { courses: req.body.course } }
  )
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return res.json(err);
    });
});

module.exports = router;
