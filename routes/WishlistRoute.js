// Purpose: to route the Wishlist requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const wishlistController = require("../controller/WishlistController");
const router = express.Router();
//---------------------------------------------------//

//------------------Wishlist Routes----------------//
router.post("/create", wishlistController.create);

router.get("/find-by-id/:id", wishlistController.findById);

router.delete("/delete-by-id/:id", wishlistController.deleteById);

router.put("/update/:id", wishlistController.update);

router.get("/find-all", wishlistController.findAll);
//-------------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//
