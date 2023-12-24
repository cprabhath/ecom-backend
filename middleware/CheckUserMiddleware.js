// Desc: Middleware to check if user is admin

//--------------------Check admin-------------------//
const check = (req, res, next) => {
  if (req.user && req.user.role !== "user") {
    next();
  } else {
    res.status(403).json({ 
      message: "Access denied: Admins only" 
    });
  }
};
//--------------------------------------------------//

//------------------Export module----------------//
module.exports = check;
//------------------------------------------------//
