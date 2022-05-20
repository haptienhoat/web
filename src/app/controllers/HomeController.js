const product = require('../models/Product')
const user = require('../models/User')
const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose')

class HomeController {
    index(req, res) {
        user.findOne({username: req.cookies.username})
        .then(user => {
            if (user) {
                res.render('home', {user: mongooseToObject(user)})
            } else {
                res.render('home')
            }
        })
    }

    search(req, res) {
        const user_data = user.findOne({username: req.cookies.username})
        const product_data = product.find({name : req.query.key})
        Promise.all([user_data, product_data])
        .then(([user, product]) => {
            if (user) {
                res.render('search', {user: mongooseToObject(user),
                product: mutipleMongooseToObject(product)})
            } else {
                res.render('search', {product: mutipleMongooseToObject(product)})
            }
        }) 
    }
}

module.exports = new HomeController