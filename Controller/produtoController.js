const ProdutoModel = require('../Models/ProdutoModel')
const CategoriaModel = require('../Models/CategoriaModel')
const MarcaModel = require('../Models/MarcaModel')
class ProdutoController{
    async readProduto(req,res){
        res.render('admin/produto/listar')
    }
    async registerView(req,res){
        let cat = new CategoriaModel()
        let marca = new MarcaModel()
        cat = await cat.read()
        marca = await marca.read()
        res.render('admin/produto/cadastrar',{cat,marca})
    }
    async newRegister(req,res){
        let ok = true
        let msg = ''
        if(req.body.nome && req.body.preco && req.body.quantidade && req.body.descricao
            && req.body.status && req.body.categoria && req.body.marca && req.file ){
                // console.log(req.file.filename)
                let model = new ProdutoModel(0,req.body.nome,req.body.descricao,req.file.filename
                    ,req.body.preco,req.body.quantidade,req.body.categoria,req.body.marca,req.body.validade,
                    req.body.status)
                let result = await model.create()
                if(result){
                    msg = 'Sucesso ao cadastrar o produto!'
                    return res.send({msg,ok})
                }else{
                    ok = false
                    msg = 'Não foi possível realizar o cadastro de produto'
                    return res.send({msg,ok})
                }
        }
    }
}
module.exports = ProdutoController