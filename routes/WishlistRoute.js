// Purpose: to route the Wishlist requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const wishlistController = require("../controller/WishlistController");
const verifyToken = require("../middleware/VerifyTokenMiddleware");
const router = express.Router();
//---------------------------------------------------//

//------------------Wishlist Routes----------------//
router.post("/create", verifyToken, wishlistController.create);

router.get("/find-by-id/:id", verifyToken, wishlistController.findById);

router.delete("/delete-by-id/:id", verifyToken, wishlistController.deleteById);

router.put("/update/:id", verifyToken, wishlistController.update);

router.get("/find-all", verifyToken, wishlistController.findAll);
//-------------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//
