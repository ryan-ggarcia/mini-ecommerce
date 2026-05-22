const ProdutoModel = require('../Models/ProdutoModel')
const CategoriaModel = require('../Models/CategoriaModel')
const MarcaModel = require('../Models/MarcaModel')
const fs = require('fs')
class ProdutoController {
    async readProduto(req, res) {
        let model = new ProdutoModel()
        let produto = await model.getAll()
        res.render('admin/produto/listar', { produto })
    }
    async registerView(req, res) {
        let cat = new CategoriaModel()
        let marca = new MarcaModel()
        cat = await cat.read()
        marca = await marca.read()
        res.render('admin/produto/cadastrar', { cat, marca })
    }
    async updateView(req, res) {
        let produto = new ProdutoModel()
        let cat = new CategoriaModel()
        let marca = new MarcaModel()
        produto = await produto.getForId(req.params.id)
        cat = await cat.read()
        marca = await marca.read()
        res.render('admin/produto/alterar', { produto, cat, marca })
    }
    async newRegister(req, res) {
        let ok = true
        let msg = ''
        if (req.body.nome && req.body.preco && req.body.quantidade && req.body.descricao
            && req.body.status && req.body.categoria && req.body.marca && req.file) {
            // console.log(req.file.filename)
            let model = new ProdutoModel(0, req.body.nome, req.body.descricao, req.file.filename
                , req.body.preco, req.body.quantidade, req.body.categoria, req.body.marca,0,
                req.body.status)
            let result = await model.create()
            if (result) {
                msg = 'Sucesso ao cadastrar o produto!'
                return res.send({ msg, ok })
            } else {
                ok = false
                msg = 'Não foi possível realizar o cadastro de produto'
                return res.send({ msg, ok })
            }
        }
    }
    async update(req, res) {
        let ok = false
        let msg = ''
        // Validação se os dados enviados pelo front
        if (req.body.id && req.body.nome && req.body.preco && req.body.quantidade && req.body.descricao
            && req.body.status && req.body.categoria && req.body.marca) {
            // instenção da model de produtos e passando dados
            let model = new ProdutoModel(req.body.id, req.body.nome, req.body.descricao, ''
                , req.body.preco, req.body.quantidade, req.body.categoria, req.body.marca,0,
                req.body.status)
            //metodo para pegarmos todas as infromações do produto antes de realizamos a atualização
            let id = await model.getForId(req.body.id)
            //Validação de imagem --> se foi enviada ou não enviada
            if (req.file != null) {
                // Pega a imagem atiga e faça a exclução da propria e grava a nova imagem na model
                let nomeImg = id.getPro_image()
                // console.log(nomeImg)
                if (fs.existsSync(global.CAMINHO_ABS + nomeImg))
                    fs.unlinkSync(global.CAMINHO_ABS + nomeImg)
                model.setPro_image(req.file.filename)
                // console.log(model.getPro_image())
            }
            else {
                // Não veio imagem então permanece a mesma
                model.setPro_image(id.getPro_image())
            }
            ok = await model.update()
        } else {
            msg = "Erro..."
        }
        return res.send({ok})
    }
    async deletar(req,res){
        let ok = false
        if(req.body.id != null){
            let model = new ProdutoModel()
            let img = await model.getForId(req.body.id)
            let nomeImg = img.getPro_image()
            let result = await model.deletar(req.body.id)
            if(result){
                ok = true
                if(fs.existsSync(global.CAMINHO_ABS + nomeImg))
                    fs.unlinkSync(global.CAMINHO_ABS + nomeImg)
                return res.send({ok})
            }else{
                return res.send({ok})
            }
        }
    }
}
module.exports = ProdutoController