// Purpose: to route the Cart requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const cartController = require("../controller/CartController");
const router = express.Router();
//---------------------------------------------------//

//------------------Cart Routes----------------//
router.post("/create", cartController.create);

router.get("/find-by-id/:id", cartController.findById);

router.delete("/delete-by-id/:id", cartController.deleteById);

router.put("/update/:id", cartController.update);

router.get("/find-all", cartController.findAll);
//-------------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//