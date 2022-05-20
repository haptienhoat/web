const express = require('express')
const router = express.Router()
const cartController = require('../app/controllers/CartController')

router.get('/', cartController.index)
router.get('/creat/:name', cartController.creat)
router.get('/:name/remove', cartController.remove)
router.get('/order', cartController.order)

module.exports = router