const express = require("express");
const router = express.Router();

const notificationschema = require("../../models/notifications");

router.post("/", (req, res) => {
  const newnoitfication = new notificationschema({
    name: req.body.name,
    student: req.body.student
  });

  newnoitfication.save().then(notification => res.json(notification));
});

router.post("/getnotifications", (req, res) => {
  notificationschema.find(
    { student: req.body.student, status: "false" },
    function(err, files) {
      if (err) {
        console.log(err);
      } else {
        res.json(files);
      }
    }
  );
});

router.put("/updatestatus/:id", (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  notificationschema
    .update({ _id: ObjectID(req.params.id) }, { $set: { status: "notified" } })
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return res.json(err);
    });
});

module.exports = router;
