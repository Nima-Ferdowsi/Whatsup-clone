const express = require("express");
const { newUser, login, getAllUser } = require("../controller/user");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const User = require("../model/user");
const Room = require("../model/room");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${uuidv4()}--${Date.now()}.jpg`);
  },
});

const upload = multer({
  dest: "uploads/",
  storage,
});
const router = express.Router();

//sign in route
router.post("/signin", newUser);

//login route
router.post("/login", login);

router.get("/get_usersList", getAllUser);
router.post(
  "/upload-avatar",
  upload.single("avatar"),
  async (req, res, next) => {
    User.find({ _id: req.body.id })
      .then((data) => {
        data[0].avatar = req.file.filename;
        data[0].save();
        console.log("saved");
      })
      .then((data) => {
        res.status(200).send(req.file.filename);
        if (req.body.room) {
          let rooms = req.body.room.split(",");

          rooms.map((elem) => {
            Room.findOne({ roomId: elem }, async (err, data) => {
              const index = await data.users.findIndex(
                (item) => item.id === req.body.id
              );
              data.users[index].avatar = await req.file.filename;
              data.markModified("users");
              data.save(function (err) {
                if (err) {
                  console.log(err);
                  res.status(500).send("could not save");
                }
              });
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("there is an error from server sorry");
      });
  }
);
module.exports = router;
