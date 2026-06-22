const Database = require('../DB/database')

class ItemProdutoModel {
    #iProd_id
    #iProd_valorUnitario
    #iProd_valorTotal
    #iProd_quantidade
    #ped_id
    #pro_id
    #usu_nome
    #pro_nome
    #ped_data

    constructor(iProd_id, valorUnitario, valorTotal, quantidade, ped_id, pro_id,pro_nome,usu_nome,ped_data) {
        this.#iProd_id = iProd_id
        this.#iProd_valorUnitario = valorUnitario
        this.#iProd_valorTotal = valorTotal
        this.#iProd_quantidade = quantidade
        this.#ped_id = ped_id
        this.#pro_id = pro_id
        this.#pro_nome = pro_nome
        this.#usu_nome = usu_nome
        this.#ped_data = ped_data
    }
    getIProd_id() { return this.#iProd_id }
    getIProd_valorUnitario() { return this.#iProd_valorUnitario }
    getIProd_valorTotal() { return this.#iProd_valorTotal }
    getIProd_quantidade() { return this.#iProd_quantidade }
    getPed_id() { return this.#ped_id }
    getPro_id() { return this.#pro_id }
    getPro_nome() { return this.#pro_nome }
    getUsu_nome() { return this.#usu_nome }
    getPed_data() { return this.#ped_data }

    setIProd_id(iProd_id) { this.#iProd_id = iProd_id }
    setIProd_valorUnitario(valorUnitario) { this.#iProd_valorUnitario = valorUnitario }
    setIProd_valorTotal(valorTotal) { this.#iProd_valorTotal = valorTotal }
    setIProd_quantidade(quantidade) { this.#iProd_quantidade = quantidade }
    setPed_id(ped_id) { this.#ped_id = ped_id }
    setPro_id(pro_id) { this.#pro_id = pro_id }

    async create() {
        let sql = `INSERT INTO item_produto (iProd_valorUnitario,iProd_valorTotal,iProd_quantidade,ped_id,pro_id) VALUES (?,?,?,?,?)`
        let values = [this.#iProd_valorUnitario, this.#iProd_valorTotal, this.#iProd_quantidade, this.#ped_id, this.#pro_id]
        let banco = new Database()
        let result = await banco.ExecutaComandoNonQuery(sql, values)
        return result
    }
    async deletar(id) {
        let sql = `DELETE FROM item_produto WHERE iProd_id = ?`
        let values = [id]
        let banco = new Database()
        let result = await banco.ExecutaComandoNonQuery(sql, values)
        return result
    }
    async read(busca) {
        let sql = `SELECT i.iPro_id, i.iProd_valorUnitario, i.iProd_valorTotal, i.iProd_quantidade, p.pro_nome, ped.ped_data, u.usu_nome 
        FROM item_produto i 
        INNER JOIN produto p ON p.pro_id = i.pro_id
        INNER JOIN pedido ped ON ped.ped_id = i.ped_id
        INNER JOIN usuario u ON u.usu_id = ped.usu_id`
        let values = []
        if (busca != null &&busca.trim() != "") {
            sql += ` WHERE iPro_id = ? OR usu_nome LIKE ?  `
            values = [busca, `%${busca}%`]
        }
        let banco = new Database()
        let result = await banco.ExecutaComando(sql,values)
        let lista = []
        result.forEach(r => {
            lista.push(new ItemProdutoModel(
                r['iPro_id'],
                r['iProd_valorUnitario'],
                r['iProd_valorTotal'],
                r['iProd_quantidade'],
                r['ped_id'],
                r['pro_id'],
                r['pro_nome'],
                r['usu_nome'],
                r['ped_data'],
            ))
        })
        return lista
    }
    toJSON(){
        return{
            iProd_id: this.#iProd_id,
            iProd_valorUnitario: this.#iProd_valorUnitario,
            iProd_valorTotal: this.#iProd_valorTotal,
            iProd_quantidade: this.#iProd_quantidade,
            ped_id : this.#ped_id,
            pro_id : this.#pro_id,
            pro_nome: this.#pro_nome,
            ped_data: this.#ped_data,
            usu_nome: this.#usu_nome
        }
    }
}
module.exports = ItemProdutoModel