const ProdutoModel = require('../Models/ProdutoModel')
class HomeController {
    async homeView(req, res) {
        let produtos = new ProdutoModel()
        produtos = await produtos.getAll()
        res.render('home/home', { produtos: produtos })
    }
    async produtoView(req, res) {
        let produtos = new ProdutoModel()
        produtos = await produtos.getForId(req.params.id)
        res.render('home/produto',{produto:produtos})
    }
    async carrinhoView(req,res){
        res.render('home/carrinho')
    }
}
module.exports = HomeController