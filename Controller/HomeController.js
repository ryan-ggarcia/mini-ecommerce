const ProdutoModel = require('../Models/ProdutoModel')
class HomeController {
    async homeView(req, res) {
        let produtos = new ProdutoModel()
        produtos = await produtos.getAll()
        res.render('home/home', { produtos: produtos })
    }
    async shopView(req, res) {
        let produtos = new ProdutoModel()
        produtos = await produtos.getAll()
        res.render('home/shop', { produtos: produtos, query: req.query })
    }
    async produtoView(req, res) {
        let produtos = new ProdutoModel()
        let produto = await produtos.getForId(req.params.id)
        let relacionados = await new ProdutoModel().getAll()
        relacionados = relacionados.filter(p => p.getPro_id() != req.params.id).slice(0, 4)
        res.render('home/produto', { produto: produto, relacionados: relacionados })
    }
    async carrinhoView(req,res){
        res.render('home/carrinho')
    }
}
module.exports = HomeController