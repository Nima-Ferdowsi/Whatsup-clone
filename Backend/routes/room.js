const { newRoom, deleteRoom, getAllRooms } = require("../controller/room");
const { newMessage, getMessage, removeMessage } = require("../controller/messages");

const Room = require("../model/room");
const randomid = require("crypto");
const { Router } = require("express");


const route = Router();

route.post("/rooms/new-room",newRoom)


//delete room route
route.post("/rooms/delete-room", async (req, res) => {
  await deleteRoom(req.body.roomId)
    .then((data) => {
       res.status(202).send(data)})
    .catch((err) => res.status(500).send(err));
});


//new message route
route.post("/rooms/new-msg", newMessage); 
route.post("/rooms/get-msg",getMessage)
route.post("/rooms/remove-msg",removeMessage)



route.get('/rooms/get_all',getAllRooms)
module.exports = route;


