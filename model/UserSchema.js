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
  },

  password: {
    type: String,
    required: true,
  },

  activeState: {
    type: Boolean,
    required: true,
  },
  
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
});
//--------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongoose.model("User", UsersSchema);
//-----------------------------------------------//
