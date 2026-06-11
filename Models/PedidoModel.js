const database = require('../DB/database')
class PedidoModel{
    #ped_id
    #ped_data
    #ped_valorTotal
    #ped_status
    #usu_id
    #end_id

    constructor(id,data,valoTotal,status,usu,end){
        this.#ped_id = id
        this.#ped_data = data
        this.#ped_valorTotal = valoTotal
        this.#ped_status = status
        this.#usu_id = usu
        this.#end_id = end
    }

    getPed_id(){ return this.#ped_id }
    getPed_data(){ return this.#ped_data }
    getPed_valorTotal(){ return this.#ped_valorTotal }
    getPed_status(){ return this.#ped_status }
    getUsu_id(){ return this.#usu_id }
    getEnd_id(){ return this.#end_id }

    setPed_id(id){ this.#ped_id = id }
    setPed_data(data){ this.#ped_data = data }
    setPed_valorTotal(valoTotal){ this.#ped_valorTotal = valoTotal }
    setPed_status(status){ this.#ped_status = status }
    setUsu_id(usu){ this.#usu_id = usu }
    setEnd_id(end){ this.#end_id = end }

    async create(){
        let sql = "INSERT INTO pedido (ped_data,ped_valorTotal,ped_status,usu_id,end_id) VALUES (NOW(),?,?,?,?)"
        let values = [this.#ped_valorTotal,"PENDENTE",this.#usu_id,this.#end_id]
        let banco = new database()
        let result = await banco.ExecutaComandoLastInserted(sql,values)
        return result
    }
    async deletar(id){
        let sql = "DELETE FROM pedido WHERE ped_id = ?"
        let values = [id]
        let banco = new database()
        let result = await banco.ExecutaComandoNonQuery(sql,values)
        return result
    }
}
module.exports = PedidoModel