const PedidoModel = require('../Models/PedidoModel')
const UsuarioModel = require('../Models/UsuarioModel')
const ItemProdutoModel = require('../Models/ItemProdutoModel')
class PedidoController {
    async registerPedido(req, res) {
        // Array com os produtos do carrinho
        const itens = req.body.json
        let usuEnd = new UsuarioModel()
        usuEnd = await usuEnd.findAddress(req.cookies.usuarioLogado)
        if (usuEnd != null) {
            let pedido
            //percorre UM por vez
            for (let item of itens) {
                let pedidoModel = new PedidoModel(0,0, item.valorTotal, 0, req.cookies.usuarioLogado,usuEnd)
                pedido = await pedidoModel.create()
            }
            if(pedido != null && pedido > 0){
                for(let item of itens){
                    let itemProduto = new ItemProdutoModel(0,item.valorUnitario,item.valorTotal,item.quantidade,pedido,item.idProduto)
                }
            }
            if(itemProduto){
                let ok = true
                let msg = 'Sucesso!'
                return res.json({msg,ok})
            }else{
                let ok = false
                let msg = 'Erro...!'
                return res.json({msg,ok})
            }
        }



    }
}
module.exports = PedidoController