// Purpose: to route the History requests to the controller

//--------------------Importing Packages----------------//
const express = require("express");
const historyController = require("../controller/HistoryController");
const router = express.Router();
//-----------------------------------------------------//

//--------------------History Routes----------------//

//-----------------Access Level: Admin----------------//
router.delete("/delete-by-id/:id", historyController.deleteById);

//-----------------Access Level: User----------------//
router.post("/create", historyController.create);

router.get("/find-by-id/:id", historyController.findById);

router.delete("/find-all", historyController.findAll);
//-------------------------------------------------//

//--------------------Export module----------------//
module.exports = router;
//-------------------------------------------------//