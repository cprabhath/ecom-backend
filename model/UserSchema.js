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
    required: true,
  },

  role: {
    type: String,
    default: "user",
    required: true,
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  address: {
    type: String,
    required: false,
  },

  mobileNumber: {
    type: String,
    required: false,
  },

  gender: {
    type: String,
    required: false,
  },

  imageUrl: {
    type: String,
    required: false,
    default: "https://firebasestorage.googleapis.com/v0/b/react-pos-70e5e.appspot.com/o/ecom%2FOIP.jpeg?alt=media&token=da616759-21c2-474f-b12c-559fded5c607",
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
