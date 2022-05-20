const cart = require('../models/Cart')
const product = require('../models/Product')
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose')
const user = require('../models/User')

class CartController {
    index(req, res) {
        user.findOne({ username: req.cookies.username })
            .then(data => {
                if (data) {
                    const user_data = user.findOne({ username: req.cookies.username })
                    const cart_data = cart.find({ username: req.cookies.username })
                    Promise.all([user_data, cart_data])
                        .then(([user, cart]) => {
                            var totalprice = 0
                            cart.forEach(function (carts) {
                                totalprice += parseInt(carts.price)
                            })
                            res.render('cart', {
                                user: mongooseToObject(user),
                                cart: mutipleMongooseToObject(cart),
                                totalprice: totalprice
                            })
                        })
                } else {
                    res.redirect('/')
                }
            })
    }

    creat(req, res) {
        user.findOne({ username: req.cookies.username })
            .then(data => {
                if (data) {
                    product.findOne({ name: req.params.name })
                        .then(product => {
                            const newcart = cart()
                            newcart.username = req.cookies.username
                            newcart.name = product.name
                            newcart.price = product.price
                            newcart.image = product.image
                            newcart.save()
                                .then(() => {
                                    const link = '/product/' + product.name
                                    res.redirect(link)
                                })
                        })
                } else {
                    res.redirect('/')
                }
            })
    }

    remove(req, res) {
        user.findOne({ username: req.cookies.username })
            .then(data => {
                if (data) {
                    cart.deleteOne({ name: req.params.name })
                        .then(() => {
                            res.redirect('/cart')
                        })
                } else {
                    res.redirect('/')
                }
            })
    }

    order(req, res) {
        var findpromise = [], updatepromise = []
        user.findOne({ username: req.cookies.username })
            .then(data => {
                if (data) {
                    cart.find({ username: req.cookies.username })
                        .then(carts => {
                            carts.forEach(function (cartss) {
                                var findpromises = product.findOne({ name: cartss.name })
                                findpromise.push(findpromises)
                            })
                            Promise.all(findpromise)
                                .then((products) => {
                                    products.forEach(function (productss) {
                                        productss.quantity_in_stock = (parseInt(productss.quantity_in_stock) - 1).toString()
                                        var updatepromises = product.updateOne({ name: productss.name }, productss)
                                        updatepromise.push(updatepromises)
                                    })
                                    Promise.all(updatepromise)
                                        .then(() => {
                                            cart.deleteMany({ username: req.cookies.username })
                                                .then(() => {
                                                    res.redirect('/')
                                                })
                                        })

                                })

                        })
                } else {
                    res.redirect('/')
                }
            })
    }
}

module.exports = new CartController