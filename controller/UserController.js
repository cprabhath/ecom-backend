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
const loginUrl = `${process.env.BASEURL}/api/v1/users/login`;
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
              role: req.body.role || "user",
            });
            // Sending Activation Email
            try {
              const token = uuidv4();
              user.emailVerificationToken = token;
              user.emailVerificationExpires = Date.now() + 3600000;

              const verificationUrl = `http://${req.headers.host}/api/v1/users/verify/${token}`;

              const emailContent =
                "Thank you for signing up for Happy Shop. We're really happy to have you!. Please click on the button below to verify your email address";

              emailService.sendEmail(res, user.email, "Verify Your Email", {
                heading: "Email Verification",
                action: "Verify Email",
                username: user.fullName,
                link: verificationUrl,
                message: emailContent,
              });
              user.save();
              return ResponseService(
                res,
                200,
                `Welcome to Happy Shop ${req.body.fullName}! Please check your email for activation link.`
              );
            } catch (err) {
              return ResponseService(res, 500, err.message);
            }
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
          } else if (result) {
            // Checking Email Verified
            if (!selectedUser.emailVerified) {
              return ResponseService(
                res,
                401,
                "Please activate your account first. Check your email for activation link."
              );
            }
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
            return ResponseService(res, 200, {token, selectedUser});
          } else {
            return ResponseService(res, 401, "Incorrect password");
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
    } else if (user.emailVerified === false) {
      return ResponseService(
        res,
        401,
        "Please activate your account first. Check your email for activation link."
      );
    }
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    const resetUrl = `http://${req.headers.host}/api/v1/users/reset/${token}`;
    const emailContent = `You requested a password reset. Click on below button to reset your password. This Link only valid for one hour`;

    emailService
      .sendEmail(res, req.body.email, "Reset Password", {
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
      .sendEmail(res, req.body.email, "Your Password Changed!", {
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

//----------------------Verify Email----------------------//

const verifyEmail = async (req, res) => {
  try {
    const user = await UserSchema.findOne({
      emailVerificationToken: req.params.token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return ResponseService(
        res,
        401,
        "Verification token is invalid or has expired."
      );
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    return ResponseService(res, 200, "Email verified successfully.");
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
  verifyEmail,
};
//------------------------------------------------------//
