const mongoose = require("mongoose");
const Room = require("../model/room");
const User = require("../model/user");

const randomid = require("crypto");

//get all room function

exports.getAllRooms = (req, res) => {
  Room.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
};

exports.newRoom = (req, res, next) => {
  try {
    Room.create({
      roomId: randomid.randomBytes(64).toString("hex"),
      users: req.body.users,
      messages: [],
    })
      .then((data) => {
        data.users.map((elem) => {
          //add rooms to users after creatin room
          User.findById(elem.id).then((data2) => {
            data2.room.push(data.roomId);
            data2.save();
          });
        });
        res.status(201).send(data);
      })
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
};
//delete room function
exports.deleteRoom = (id) => {
  return new Promise((resolve, reject) => {
    try {
      User.find({ room: { $in: [id] } }).then((data) => {
        data.map((elem) => {
          elem.room.map((elem2) => {
            if (elem2 === id) {
              elem.room.splice(elem.room.indexOf(elem2), 1);
              elem.save(function (err) {
                if (err) {
                  console.log(err);
                  res.status(500).send("could not save");
                } else {
                  Room.deleteOne({ roomId: id })
                    .then((data1) => {
                      resolve(data1);
                    })
                    .catch((err) => reject(err));
                }
              });
            }
          });
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
