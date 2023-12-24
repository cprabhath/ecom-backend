// Purpose: to route the User requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const userController = require("../controller/UserController");
const router = express.Router();
//---------------------------------------------------//

//------------------Login and Reg Routes----------------//
router.post("/register", userController.register);

router.post("/login", userController.login);
//--------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//
