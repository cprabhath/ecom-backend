// Purpose: to create a schema for the users collection in the database

//------------------Importing Packages----------------//
const mongoose = require("mongoose");
//----------------------------------------------------//

//------------------User Schema----------------//
const UsersSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: false,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  imageUrl: {
    type: String,
    required: false,
  },

  emailVerificationToken: String,
  emailVerificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });
//--------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongoose.model("User", UsersSchema);
//-----------------------------------------------//
