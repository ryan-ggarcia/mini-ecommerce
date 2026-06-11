const PedidoModel = require('../Models/PedidoModel')
const UsuarioModel = require('../Models/UsuarioModel')
const ItemProdutoModel = require('../Models/ItemProdutoModel')
class PedidoController {
    async registerPedido(req, res) {
        // Array com os produtos do carrinho
        const itens = req.body.json
        let usuEnd = new UsuarioModel()
        usuEnd = await usuEnd.findAddress(req.cookies.UsuarioLogado)
        if (usuEnd == null) {
            let ok = false
            let msg = 'Você não tem um endereço cadastrado!'
            return res.json({ msg, ok })
        }
        //percorre UM por vez
        let pedido
        let itemProduto
        let pedidoModel = new PedidoModel(0, 0, itens[0].valorTotal, 0, req.cookies.UsuarioLogado, usuEnd)
        pedido = await pedidoModel.create()
        if (pedido != null && pedido > 0) {
            for (let item of itens) {
                let itemProdutoModel = new ItemProdutoModel(0, item.valorUnitario, item.valorTotal, item.quantidade, pedido, item.idProduto)
                itemProduto = await itemProdutoModel.create()
            }
        } else {
            let ok = false
            let msg = 'Erro ao cadastrar o item do pedido!'
            await pedidoModel.deletar(pedido)
            return res.json({ msg, ok })
        }
        if (itemProduto) {
            let ok = true
            let msg = 'Sucesso!'
            return res.json({ msg, ok })
        } else {
            let ok = false
            let msg = 'Erro...!'
            return res.json({ msg, ok })
        }
    }
}
module.exports = PedidoController