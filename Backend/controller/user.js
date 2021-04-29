const User = require("../model/user");

//create new user
exports.newUser = (req, res, next) => {
  try { 

User.findOne({email:req.body.email}).then(user=>{

  if(!user){
    User.create(req.body)
      .then(() => {
        res.send({ message: "succses" });
      }) 
      .catch((err) => {
        res.send({ message: "error", detailes: 'there is error from the server' });

        console.log(err);
      });  
  } 
 
  else{
    res.send({ message: "exist", detailes: 'You have already signed up' });

  }

})

} 
catch (err) {
  res.send({ message: "error", detailes: err });
}
};

//login function
exports.login = (req, res, next) => {
  User.findOne(req.body, (err, data) => {
    if (err) { 
      res.status(500).send({ status: 409, result:'there is error in the server' });
    } else if (data) {
      res.status(200).send({ status: 200, result: data });
    } else {
      res
        .status(404)
        .send({ status: 404, result: "UserName or password are inccorect" });
    }
  });
}; 
exports.getAllUser = (req, res, next) => {
  User.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err)) ;
};
