// Purpose: Check if user is admin or not

//----------------- Importing Packages --------------------//
const jwt = require("jsonwebtoken");
const verifyToken = require("../services/VerifyTokenService");
//--------------------------------------------------------//

//------------------ Check User Middleware ----------------//
const CheckAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      message: "Token is missing",
    });
  }
  //verify token
  const decoded = await verifyToken(token);
  //check if user is admin
  try {
    if (decoded.role !== "user") {
      next();
    } else {
      res.status(403).json({
        message: "Access denied. You are not an admin",
      });
    }
  } catch (error) {
    res.status(403).json({
      message: error,
    });
  }
};
//---------------------------------------------------------//

//------------------ Export Module--------------//
module.exports = CheckAdmin;
//----------------------------------------------//
