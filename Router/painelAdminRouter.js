const PainelController = require('../Controller/PainelController')
const express = require('express')

const router = express.Router()
let controller = new PainelController()

router.get('/',controller.homePage)

module.exports = router