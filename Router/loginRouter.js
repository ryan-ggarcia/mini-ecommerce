const LoginController = require('../Controller/LoginController')
const express = require('express')

const router = express.Router()
let controller = new LoginController()

router.get('/login',controller.login)
router.post('/efetuarLogin', controller.efetuarLogin)
router.get('/cadastrar', controller.cadastro)
module.exports = router