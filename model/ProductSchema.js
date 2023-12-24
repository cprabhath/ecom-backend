// Purpose: to create a schema for the products collection in the database

//------------------Importing Packages----------------//
const mongoose = require("mongoose");
//----------------------------------------------------//

//------------------Product Schema----------------//
const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  qtyOnHand: {
    type: Number,
    required: true,
  },
});
//------------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongoose.model("Product", ProductsSchema);
//------------------------------------------------//
