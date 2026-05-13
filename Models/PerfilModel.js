const database = require('../DB/database')
class PerfilModel{
    #per_id
    #per_nome
    constructor(id,nome){
        this.#per_id = id
        this.#per_nome = nome
    }
    get geId(){return this.#per_id}
    set setId(x){this.#per_nome = x}

    get getNome(){return this.#per_nome}
    set setNome(x){this.#per_nome = x}

    async read(){
        let sql = `SELECT * FROM perfil`
        let banco = new database()
        let result = await banco.ExecutaComando(sql)
        let lista
        result.forEach(r =>{
            lista.push(new PerfilModel(
                r['per_id'],
                r['per_nome']
            ))
        })
        return lista
    }
}
module.exports = PerfilModel