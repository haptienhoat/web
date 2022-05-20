const mongoose = require('mongoose')
const Schema = mongoose.Schema

const product = new Schema({
    name: {type: String},
    type: {type: String},
    color: {type: String},
    price: {type: String},
    quantity_in_stock: {type: String},
    image: {type: String}
},
{
    timestamps: true,
});

module.exports = mongoose.model('product', product)