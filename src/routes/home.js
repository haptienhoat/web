const express = require('express')
const router = express.Router()
const homeController = require('../app/controllers/HomeController')

router.get('/', homeController.index)
router.get('/search', homeController.search)

module.exports = router