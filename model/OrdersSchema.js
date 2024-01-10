// Purpose: to create a schema for the orders collection in the database

//-----------------Importing Packages----------------//
const mongoose = require("mongoose");
//----------------------------------------------------//

//------------------Orders Schema----------------//
const OrdersSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
  },

  userID: {
    type: String,
    required: true,
  },

  totalCost: {
    type: Number,
    required: true,
  },

  products: {
    type: [],
    required: true,
  },

  status: {
    type: String,
    required: false,
    default: "Pending"
  },
}, { timestamps: true });
//------------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongoose.model("Orders", OrdersSchema);
//------------------------------------------------//
