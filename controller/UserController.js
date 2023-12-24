// Used for user registration and login

//-----------------Importing Packages----------------//
const UserSchema = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailService = require("../services/EmailService");
const { v4: uuidv4 } = require("uuid");
const ResponseService = require("../services/ResponseService");
//---------------------------------------------------//

//-----------------Global Variables----------------//
const salt = 10;
const loginUrl = `${process.env.BASEURL + process.env.SERVER_PORT}/api/v1/users/login`;
//-------------------------------------------------//

//------------------User Register----------------//
const register = (req, res) => {
  // Check if the provided role is valid (either "admin" or "user")
  const allowedRoles = ["admin", "user"];
  const role = req.body.role || "user";

  if (!allowedRoles.includes(role)) {
    return ResponseService(res, 400, "Invalid role provided");
  } else {
    // Checking email already exists
    UserSchema.findOne({ email: req.body.email }).then((user) => {
      if (user !== null) {
        return ResponseService(res, 409, "Email already exists");
      } else {
        // Hashing Password
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            return ResponseService(res, 500, err.message);
          } else {
            // Creating User
            const user = new UserSchema({
              fullName: req.body.fullName,
              email: req.body.email,
              password: hash,
              activeState: true,
              role: req.body.role || "user",
            });
            // Sending Activation Email
            emailService
              .sendEmail(req.body.email, "Account Created Successfully", {
                type: "welcome",
                heading: "Happy Shop",
                username: req.body.fullName,
                link: loginUrl,
                message:"Happy Shop",
              })
              .then((emailSent) => {
                if (emailSent) {
                  user
                    .save()
                    .then((result) => {
                      return ResponseService(
                        res,
                        201,
                        result.fullName + " created successfully"
                      );
                    })
                    .catch((err) => {
                      return ResponseService(res, 500, err.message);
                    });
                } else {
                  return ResponseService(res, 500, "Error occurred.");
                }
              })
              .catch((err) => {
                return ResponseService(res, 500, err.message);
              });
          }
        });
      }
    });
  }
};
//----------------------------------------------//

//------------------User Login------------------//
const login = (req, res) => {
  // Checking email exists
  UserSchema.findOne({ email: req.body.email }).then((selectedUser) => {
    if (selectedUser === null) {
      return ResponseService(res, 404, "Email not found");
    } else {
      // Comparing Password
      bcrypt.compare(
        req.body.password,
        selectedUser.password,
        (err, result) => {
          if (err) {
            return ResponseService(res, 500, err.message);
          } else {
            if (result) {
              // Creating Token
              const payload = {
                email: selectedUser.email,
                userId: selectedUser._id,
                role: selectedUser.role,
              };
              // Secret Key
              const secretKey = process.env.SECRET_KEY;
              const expiresIn = "24h";
              const token = jwt.sign(payload, secretKey, {
                expiresIn: expiresIn,
              });
              // Sending Token
              return ResponseService(res, 200, token);
            } else {
              return ResponseService(res, 401, "Password incorrect");
            }
          }
        }
      );
    }
  });
};
//----------------------------------------------//

//---------------find email and send reset link----------//
const forgotPassword = async (req, res) => {
  try {
    const token = uuidv4();
    const user = await UserSchema.findOne({ email: req.body.email });

    if (!user) {
      return ResponseService(
        res,
        404,
        "No account with that email address exists."
      );
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    const resetUrl = `http://${req.headers.host}/api/v1/users/reset/${token}`;
    const emailContent = `<p>You requested a password reset. Click on below button to reset your password. This Link only valid for one hour</p>`;

    emailService
      .sendEmail(req.body.email, "Reset Password", {
        heading: "Reset Password",
        username: "User",
        action: "Reset Password",
        link: resetUrl,
        title: "Reset your account password",
        message: emailContent,
      })
      .then((emailSent) => {
        if (emailSent) {
          user.save().then(() => {
            return ResponseService(
              res,
              200,
              "Password reset link sent to your email."
            );
          });
        } else {
          return ResponseService(res, 500, "Error occurred.");
        }
      })
      .catch((err) => {
        return ResponseService(res, 500, err.message);
      });
  } catch (err) {
    return ResponseService(res, 500, err.message);
  }
};

//----------------------------------------------//

//----------------------Reset Password----------------------//
const resetPassword = async (req, res) => {
  try {
    const user = await UserSchema.findOne({
      email: req.body.email,
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return ResponseService(
        res,
        401,
        "Password reset token is invalid or has expired."
      );
    }
    const hash = await bcrypt.hash(req.body.password, salt);

    emailService
      .sendEmail(req.body.email, "Your Password Changed!", {
        heading: "Your Password  had just Changed!",
        username: "User",
        action: "Login",
        link: loginUrl,
        title: "Your password has been changed!",
        message:
          "Your password has been successfully reset. If you did not initiate this request, please contact our support team immediately.",
      })
      .then((emailSent) => {
        if (emailSent) {
          user.password = hash;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          user.save().then(() => {
            return ResponseService(res, 200, "Password has been updated.");
          });
        } else {
          return ResponseService(res, 500, "Error occurred.");
        }
      })
      .catch((err) => {
        return ResponseService(res, 500, err.message);
      });
  } catch (err) {
    return ResponseService(res, 500, err.message);
  }
};

//----------------------------------------------//

//------------------Exporting modules--------------------//
module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
//------------------------------------------------------//
