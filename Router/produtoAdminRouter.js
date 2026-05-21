const express = require('express')
const multer = require('multer')
const ProdutoController = require('../Controller/produtoController')

const router = express.Router()
let controller = new ProdutoController()

// Config Multer
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/image/produtos')
    },
    filename: function(req,file,cb){
        let nomeArq = "PRD-" + Date.now()
        let ext = file.originalname.split(".").pop()
        cb(null, `${nomeArq}.${ext}`)
    }
})
const upload = multer({storage:storage})
router.get('/listarProduto',controller.readProduto)
router.get('/registerProduto',controller.registerView)
router.post('/registerNewProduto', upload.single('image'), controller.newRegister)
router.post('/update',upload.single('image') ,controller.update)
router.get('/updateView/:id',controller.updateView)
module.exports = router