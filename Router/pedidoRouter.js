const PedidoController = require('../Controller/PedidoController')
const express = require('express')

const router = express.Router()
let controller = new PedidoController()

router.post('/registerPedido', controller.registerPedido)

module.exports = router