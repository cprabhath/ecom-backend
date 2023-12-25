// Purpose: to create a schema for the Cart collection in the database

//------------------Importing Packages----------------//
const mongooes = require('mongoose');
//----------------------------------------------------//

//------------------Cart Schema----------------//
const CartSchema = new mongooes.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
},  { timestamps: true });
//------------------------------------------------//


//------------------Export Schema----------------//
module.exports = mongooes.model('Cart', CartSchema);
//------------------------------------------------//