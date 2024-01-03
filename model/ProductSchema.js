// Purpose: to create a schema for the products collection in the database

//------------------Importing Packages----------------//
const mongoose = require("mongoose");
//----------------------------------------------------//

//------------------Product Schema----------------//
const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
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

    imageUrls: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },
          
          altText: {
            type: String,
            required: false
          }
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);
//------------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongoose.model("Product", ProductsSchema);
//------------------------------------------------//
