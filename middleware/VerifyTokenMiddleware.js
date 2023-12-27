// Purpose: Auth middleware to verify token

//------------------Importing Packages----------------//
const verifyToken = require("../services/VerifyTokenService");
//----------------------------------------------------//

//------------------Auth Middleware----------------//
const verifyUserToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(403).json({
      message: "token is missing",
    });
  } else {
    //verify token
    try {
      const decoded = await verifyToken(token);
      if (!decoded) {
        res.status(403).json({
          message: "token is invalid",
        });
      } else {
        next();
      }
    } catch (error) {
      res.status(403).json({
        message: error,
      });
    }
  }
};
//------------------------------------------------//

//------------------Export module----------------//
module.exports = verifyUserToken;
//------------------------------------------------//
