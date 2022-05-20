const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Web', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Success');
    } catch (error) {
        console.log('Error');
    }
}

module.exports = { connect }