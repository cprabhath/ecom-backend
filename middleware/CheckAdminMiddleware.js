// Purpose: Check if user is admin or not

//----------------- Importing Packages --------------------//
const verifyToken = require("../services/VerifyTokenService");
const ResponseService = require("../services/ResponseService");
//--------------------------------------------------------//

//------------------ Check User Middleware ----------------//
const CheckAdmin = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    ResponseService(res, 403, "Token is missing");
  }
  //verify token
  const decoded = await verifyToken(token);
  //check if user is admin
  try {
    if (decoded.role !== "user") {
      next();
    } else {
      ResponseService(res, 403, "You are not admin");
    }
  } catch (error) {
    ResponseService(res, 403, error);
  }
};
//---------------------------------------------------------//

//------------------ Export Module--------------//
module.exports = CheckAdmin;
//----------------------------------------------//
