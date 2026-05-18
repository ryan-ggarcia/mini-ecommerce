const express = require('express')
const ProdutoController = require('../Controller/produtoController')

const router = express.Router()
let controller = new ProdutoController()

router.get('/listarProduto',controller.readProduto)
router.get('/registerProduto',controller.registerView)

module.exports = router