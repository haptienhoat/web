const product = require('../models/Product')
const user = require('../models/User')
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose')

class AdminController {
    add(req, res) {
        if (req.cookies.is_admin == "true") {
            user.findOne({ username: req.cookies.username })
                .then(user =>
                    res.render('admin/add', { user: mongooseToObject(user) })
                )
        } else {
            res.redirect('/')
        }
    }

    manager(req, res) {
        if (req.cookies.is_admin == "true") {
            const user_data = user.findOne({ username: req.cookies.username })
            const product_data = product.find({})
            Promise.all([user_data, product_data])
                .then(([user, product]) => {
                    res.render('admin/manager', {
                        user: mongooseToObject(user),
                        product: mutipleMongooseToObject(product)
                    })
                })
        } else {
            res.redirect('/')
        }
    }

    creat(req, res) {
        if (req.cookies.is_admin == "true") {
            product.findOne({ name: req.body.name })
                .then(data => {
                    if (data) {
                        res.redirect('/admin/manager')
                    } else {
                        const newproduct = new product(req.body)
                        newproduct.save()
                            .then(() => res.redirect('/admin/manager'))
                    }
                })
        } else {
            res.redirect('/')
        }
    }

    edit(req, res) {
        if (req.cookies.is_admin == "true") {
            const user_data = user.findOne({ username: req.cookies.username })
            const product_data = product.findOne({ name: req.params.name })
            Promise.all([user_data, product_data])
                .then(([user, product]) => {
                    res.render('admin/edit', {
                        user: mongooseToObject(user),
                        product: mongooseToObject(product)
                    })
                })
        } else {
            res.redirect('/')
        }
    }

    update(req, res) {
        if (req.cookies.is_admin == "true") {
            product.updateOne({ name: req.params.name }, req.body)
                .then(() => {
                    res.redirect('/admin/manager')
                })
        } else {
            res.redirect('/')
        }
    }

    destroy(req, res) {
        if (req.cookies.is_admin == "true") {
            product.deleteOne({ _id: req.params.id })
                .then(() => {
                    res.redirect('/admin/manager')
                })
        } else {
            res.redirect('/')
        }
    }
}

module.exports = new AdminController