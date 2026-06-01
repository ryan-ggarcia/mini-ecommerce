const HomeController = require('../Controller/HomeController')
const express = require('express')

const router = express.Router()
let controller = new HomeController()

router.get('/',controller.homeView)
router.get('/carrinho',controller.carrinhoView)
router.get('/produto/:id',controller.produtoView)
module.exports = router