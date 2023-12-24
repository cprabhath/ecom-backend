// Purpose: Auth middleware to verify token

//------------------Importing Packages----------------//
const jwt = require("jsonwebtoken");
//----------------------------------------------------//

//------------------Secret Key--------------------//
const secretKey = process.env.SECRET_KEY;
//------------------------------------------------//

//------------------Auth Middleware----------------//
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({
      message: "token is missing",
    });
  } else {
    //verify token
    jwt.verify(token, secretKey, (err, decoded) => {
      //check if error
      if (err) {
        res.status(401).json({
          message: err.message,
        });
      } else {
        //check user role
        req.user = { role: decoded.role };
        next();
      }
    });
  }
};
//------------------------------------------------//

//------------------Export module----------------//
module.exports = verifyToken;
//------------------------------------------------//
