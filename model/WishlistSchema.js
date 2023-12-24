//Purpose: to create a schema for the Wishlist collection in the database

//------------------Importing Packages----------------//
const mongooes = require('mongoose');
//----------------------------------------------------//

//------------------Wishlist Schema----------------//
const WishlistSchema = new mongooes.Schema({
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
});
//------------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongooes.model('Wishlist', WishlistSchema);
//------------------------------------------------//