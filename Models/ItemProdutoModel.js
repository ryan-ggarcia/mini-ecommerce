const Database = require('../DB/database')

class ItemProdutoModel{
    #iProd_id
    #iProd_valorUnitario
    #iProd_valorTotal
    #iProd_quantidade
    #ped_id
    #pro_id

    constructor(iProd_id,valorUnitario,valorTotal,quantidade,ped_id,pro_id){
        this.#iProd_id = iProd_id
        this.#iProd_valorUnitario = valorUnitario
        this.#iProd_valorTotal = valorTotal
        this.#iProd_quantidade = quantidade
        this.#ped_id = ped_id
        this.#pro_id = pro_id
    }
    getIProd_id(){ return this.#iProd_id }
    getIProd_valorUnitario(){ return this.#iProd_valorUnitario }
    getIProd_valorTotal(){ return this.#iProd_valorTotal }
    getIProd_quantidade(){ return this.#iProd_quantidade }
    getPed_id(){ return this.#ped_id }
    getPro_id(){ return this.#pro_id }

    setIProd_id(iProd_id){ this.#iProd_id = iProd_id }
    setIProd_valorUnitario(valorUnitario){ this.#iProd_valorUnitario = valorUnitario }
    setIProd_valorTotal(valorTotal){ this.#iProd_valorTotal = valorTotal }
    setIProd_quantidade(quantidade){ this.#iProd_quantidade = quantidade }
    setPed_id(ped_id){ this.#ped_id = ped_id }
    setPro_id(pro_id){ this.#pro_id = pro_id }

    async create(){
        let sql = `INSERT INTO item_produto (iProd_valorUnitario,iProd_valorTotal,iProd_quantidade,ped_id,pro_id) VALUES (?,?,?,?,?)`
        let values = [this.#iProd_valorUnitario,this.#iProd_valorTotal,this.#iProd_quantidade,this.#ped_id,this.#pro_id]
        let banco = new Database()
        let result = await banco.ExecutaComandoNonQuery(sql,values)
        return result
    }
    async deletar(id){
        let sql = `DELETE FROM item_produto WHERE iProd_id = ?`
        let values = [id]
        let banco = new Database()
        let result = await banco.ExecutaComandoNonQuery(sql,values)
        return result 
    }
}
module.exports = ItemProdutoModel