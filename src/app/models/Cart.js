const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cart = new Schema({
    username: {type: String},
    name: {type: String},
    price: {type: String},
    image: {type: String}
},
{
    timestamps: true,
});

module.exports = mongoose.model('cart', cart)