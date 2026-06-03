const LoginController = require('../Controller/LoginController')
const express = require('express')

const router = express.Router()
let controller = new LoginController()

router.get('/',controller.login)
router.post('/efetuarLogin', controller.efetuarLogin)

module.exports = router