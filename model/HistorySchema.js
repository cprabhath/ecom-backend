// Purpose: to create a schema for the History collection in the database

//------------------Importing Packages----------------//
const mongooes = require('mongoose');
//----------------------------------------------------//

//------------------History Schema----------------//
const HistorySchema = new mongooes.Schema({
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
}, { timestamps: true });
//------------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongooes.model('History', HistorySchema);
//------------------------------------------------//