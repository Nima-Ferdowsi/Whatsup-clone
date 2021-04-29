const express = require("express");
const {
  newUser,
  login,
  getAllUser,
} = require("../controller/user");

const router = express.Router();

//sign in route
router.post("/signin",newUser)

//login route
router.post("/login",login);

router.get("/get_usersList", getAllUser);
module.exports = router;
