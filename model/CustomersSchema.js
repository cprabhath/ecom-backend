// Purpose: to create a schema for the customers collection in the database

//------------------Importing Packages----------------//
const mongoose = require("mongoose");
//----------------------------------------------------//

//------------------Customer Schema----------------//
const CustomersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
    required: true,
  },
});
//------------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongoose.model("Customers", CustomersSchema);
//------------------------------------------------//
