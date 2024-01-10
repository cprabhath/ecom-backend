// Purpose: to route the admin requests to the controller

//-----------------Importing Packages----------------//
const express = require("express");
const AdminController = require("../controller/AdminController");
const checkRole = require("../middleware/CheckAdminMiddleware");
const router = express.Router();
//---------------------------------------------------//

//------------------Admin Routes--------------------//
//-----------------Access Level: Admin----------------//
router.post("/admin-login", checkRole, AdminController.login);

router.post("/admin-register", checkRole, AdminController.register);

router.post("/admin-forgot-password", checkRole, AdminController.forgotPassword);

router.post("/admin-reset-password/:token/:email", checkRole, AdminController.resetPassword);

router.put("/update-admin/:id", checkRole, AdminController.updateUser);

router.get("/admin-find-all", checkRole, AdminController.findAll);

//---------------------------------------------------//

//------------------Export module----------------//
module.exports = router;
//-----------------------------------------------//
