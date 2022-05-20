const express = require('express')
const router = express.Router()
const profileController = require('../app/controllers/ProfileController')

router.post('/:username/update', profileController.update)
router.get('/:username', profileController.info)

module.exports = router