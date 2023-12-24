// Purpose: to route the Customer requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const customerController = require("../controller/CustomerController");
const verifyToken = require("../middleware/AuthMiddleware");
const checkRole = require("../middleware/CheckUserMiddleware");
const router = express.Router();
//---------------------------------------------------//

//------------------Customer Routes----------------//
router.post("/create", verifyToken ,customerController.create);

router.get("/find-by-id/:id", verifyToken, customerController.findById);

router.delete("/delete-by-id/:id", verifyToken, customerController.deleteById);

router.put("/update/:id", verifyToken, customerController.update);

router.get("/find-all", verifyToken, customerController.findAll);

//------------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//------------------------------------------------//
