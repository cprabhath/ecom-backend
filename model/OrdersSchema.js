// Purpose: to create a schema for the orders collection in the database

//-----------------Importing Packages----------------//
const mongoose = require("mongoose");
//----------------------------------------------------//

//------------------Orders Schema----------------//
const OrdersSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },

  customerDetails: {
    type: Object,
    required: true,
  },

  totalCost: {
    type: Number,
    required: true,
  },

  products: {
    type: Array,
    required: true,
  },
});
//------------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongoose.model("Orders", OrdersSchema);
//------------------------------------------------//
