const UsuarioController = require('../Controller/UsuarioController')
const express = require('express')

const router = express.Router()
let controller = new UsuarioController()

router.get('/listar',controller.readUser)
router.get('/cadastrar',controller.registerView)
router.post('/newRegister',controller.newRegister)
module.exports = router
