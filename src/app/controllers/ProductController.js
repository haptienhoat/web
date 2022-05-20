const product = require('../models/Product')
const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose')
const user = require('../models/User')

class ProductController {
    index(req, res) {
        const user_data = user.findOne({username: req.cookies.username})
        const product_data = product.find({})
        Promise.all([user_data, product_data])
        .then(([user, product]) => {
            if (user) {
                res.render('product', {user: mongooseToObject(user),
                product: mutipleMongooseToObject(product)})
            } else {
                res.render('product', {product: mutipleMongooseToObject(product)})
            }
        })
    }

    show(req,res) {
        const user_data = user.findOne({username: req.cookies.username})
        const product_data = product.findOne({name: req.params.name})
        Promise.all([user_data, product_data])
        .then(([user, product]) => {
            if (user) {
                res.render('product_profile', {user: mongooseToObject(user),
                product: mongooseToObject(product)})
            } else {
                res.render('product_profile', {product: mongooseToObject(product)})
            }
        })
    }
}

module.exports = new ProductController