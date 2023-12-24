// Used for user registration and login

//-----------------Importing Packages----------------//
const UserSchema = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const emailService = require("../services/EmailService");
const { v4: uuidv4 } = require("uuid");
//---------------------------------------------------//

//-----------------Global Variables----------------//
const salt = 10;
//-------------------------------------------------//

//------------------User Register----------------//
const register = (req, res) => {
  // Check if the provided role is valid (either "admin" or "user")
  const allowedRoles = ["admin", "user"];
  const role = req.body.role || "user";

  if (!allowedRoles.includes(role)) {
    res.status(400).json({
      message: "Invalid role",
    });
  } else {
    // Checking email already exists
    UserSchema.findOne({ email: req.body.email }).then((user) => {
      if (user !== null) {
        res.status(409).json({
          message: "Email already exists",
        });
      } else {
        // Hashing Password
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            res.status(500).json({
              message: err.message,
            });
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
              .sendEmail(
                req.body.email,
                "Account Activation Link",
                "<h1>You have Created your account</h1>"
              )
              .then((emailSent) => {
                if (emailSent) {
                  user
                    .save()
                    .then((result) => {
                      res.status(201).json({
                        message: result.fullName + " created successfully",
                      });
                    })
                    .catch((err) => {
                      res.status(500).json({
                        message: err.message,
                      });
                    });
                } else {
                  res.status(500).json({
                    message: "Failed to send activation email",
                  });
                }
              })
              .catch((err) => {
                res.status(500).json({
                  message: "An error occurred in sending email",
                });
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
      res.status(404).json({
        message: "User not found",
      });
    } else {
      // Comparing Password
      bcrypt.compare(
        req.body.password,
        selectedUser.password,
        (err, result) => {
          if (err) {
            res.status(401).json({
              message: "Authentication failed",
            });
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
              res.status(200).json({
                message: "Authentication successful",
                token: token,
              });
            } else {
              res.status(401).json({
                message: "Password Incorrect",
              });
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
      return res
        .status(404)
        .json({ message: "No account with that email address exists." });
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    const resetUrl = `http://${req.headers.host}/api/v1/users/reset/${token}`;
    const emailContent = `<p>You requested a password reset. Click on this <a href="${resetUrl}">link</a> to reset your password. This Link only valid for one hour</p>`;

    emailService
      .sendEmail(user.email, "Password Reset", emailContent)
      .then((emailSent) => {
        if (emailSent) {
          user.save().then(() => {
            res.status(200).json({ message: "Password reset email sent." });
          });
        } else {
          res.status(500).json({ message: "Error occurred." });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: "Error occurred: " + err.message });
  }
};

//----------------------------------------------//

//----------------------Reset Password----------------------//
const resetPassword = async (req, res) => {
  try {
    const user = await UserSchema.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired." });
    }

    const hash = await bcrypt.hash(req.body.password, salt);
    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Password has been updated." });
  } catch (err) {
    res.status(500).json({ message: "Error occurred: " + err.message });
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
