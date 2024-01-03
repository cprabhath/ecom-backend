// Purpose: to route the Cart requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const cartController = require("../controller/CartController");
const verifyToken = require("../middleware/VerifyTokenMiddleware");
const router = express.Router();
//---------------------------------------------------//

//------------------Cart Routes----------------//
router.post("/create", verifyToken, cartController.create);

router.get("/find-by-id/:id", verifyToken, cartController.findById);

router.delete("/delete-by-id/:id", verifyToken, cartController.deleteById);

router.put("/update/:id", verifyToken, cartController.update);

router.get("/find-all", verifyToken, cartController.findAll);

router.get("/cart-count", verifyToken, cartController.count);
//-------------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//
