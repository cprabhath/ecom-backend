// Purpose: to create a schema for the users collection in the database

//------------------Importing Packages----------------//
const mongoose = require("mongoose");
//----------------------------------------------------//

//------------------User Schema----------------//
const UsersSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]*$/.test(v);
      },
      message: (props) =>
        `Full name should not contain numbers or special characters`,
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
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

  emailVerificationToken: String,
  emailVerificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });
//--------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongoose.model("User", UsersSchema);
//-----------------------------------------------//
