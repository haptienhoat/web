const express = require('express')
const router = express.Router()
const adminController = require('../app/controllers/AdminController')

router.get('/add', adminController.add)
router.get('/manager', adminController.manager)
router.post('/creat', adminController.creat)
router.post('/:name/update', adminController.update)
router.get('/:name/edit', adminController.edit)
router.post('/:id/destroy', adminController.destroy)

module.exports = router