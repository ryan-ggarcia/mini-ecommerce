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

}
module.exports = ProdutoController