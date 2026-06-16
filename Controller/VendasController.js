const ItemProdutoModel = require('../Models/ItemProdutoModel')
class VendasController{
    async listarView(req,res){
        let model = new ItemProdutoModel()
        model = await model.read()
        res.render('admin/vendas/listar', {itens:model})
    }
    async buscarVendas(req,res){
        let model = new ItemProdutoModel()
        let busca = await model.read(req.params.venda)
        return res.json({res:busca})
    }
}
module.exports = VendasController