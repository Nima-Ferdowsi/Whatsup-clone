const Msg = require("../model/messages");

//create message function
exports.newMessage = (req, res) => {
  try {
    Msg.create({ roomId: req.body.roomId, messages: req.body.msg })
      .then((data) => res.status(202).send(data))
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getMessage = (req, res, next) => {
  Msg.find({ roomId: req.body.roomId })
    .then((data) => {
      res.send({ result: data });
    })
    .catch((err) => res.send(err));
};

exports.removeMessage = (req, res, next) => {
  Msg.deleteOne({_id:req.body._id},(err)=>{
    if(err){
      console.log(err);
    }
  } );
};
