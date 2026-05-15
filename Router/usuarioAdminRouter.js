const UsuarioController = require('../Controller/UsuarioController')
const express = require('express')

const router = express.Router()
let controller = new UsuarioController()

router.get('/listar',controller.readUser)
router.get('/cadastrar',controller.registerView)
router.post('/newRegister',controller.newRegister)
router.post('/fecthDelete',controller.deleteUser)
// Pegando o ID via URL e passando ela para a controller onde vai ser renderizada
router.get('/update/:id', controller.updateView)
module.exports = router
