// Purpose: to route the product requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const productController = require("../controller/ProductController");
const verifyToken = require("../middleware/AuthMiddleware");
const router = express.Router();
const checkRole = require("../middleware/CheckUserMiddleware");
//---------------------------------------------------//

//------------------Product Routes----------------//
//-----------------Access Level: Admin----------------//
router.post("/create", verifyToken, checkRole, productController.create);

router.delete("/delete-by-id/:id", verifyToken, checkRole, productController.deleteById);

router.put("/update/:id", verifyToken, checkRole, productController.update);

//-----------------Access Level: User----------------//
router.get("/find-by-id/:id", verifyToken, productController.findById);

router.get("/find-all", verifyToken, productController.findAll);
//-----------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//
