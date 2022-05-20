const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_information = new Schema({
    username: {type: String},
    name: {type: String},
    email: {type: String},
    address: {type: String},
    phone_number: {type: String},
    gender: {type: String},
    date_of_birth: {type: String},
},
{
    timestamps: true,
});

module.exports = mongoose.model('user_information', user_information);