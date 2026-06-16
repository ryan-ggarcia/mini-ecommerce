const express = require('express')
const VendasController = require('../Controller/vendasController')

let controller = new VendasController()
const router = express.Router()

router.get('/vendas',controller.listarView)
router.get('/buscarVendas',controller.buscarVendas)

module.exports = router