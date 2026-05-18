const database = require('../DB/database')
class MarcaModel{
    #marca_id
    #marca_nome
    constructor(id,nome){
        this.#marca_id = id
        this.#marca_nome = nome
    }
    getMarca_id(){return this.#marca_id}
    getMarca_nome(){return this.#marca_nome}

    setMarca_id(x){this.#marca_id = x}
    setMarca_nome(x){this.#marca_nome = x}

    async read(){
        let sql = `SELECT * FROM marca`
        let db = new database()
        let result = await db.ExecutaComando(sql)
        let listar = []
        result.forEach(r =>{
            listar.push(new MarcaModel(
                r['marca_id'],
                r['marca_nome']
            ))
        })
        return listar
    }
}
module.exports = MarcaModel