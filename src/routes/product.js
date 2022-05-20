const express = require('express')
const router = express.Router()
const productController = require('../app/controllers/ProductController')

router.get('/', productController.index)
router.get('/:name', productController.show)

module.exports = router