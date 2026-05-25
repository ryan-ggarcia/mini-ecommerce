const database = require('../DB/database')

class CategoriaModel{
    #cat_id
    #cat_nome

    constructor(cat_id,cat_nome){
        this.#cat_id = cat_id
        this.#cat_nome = cat_nome
    }

    getCat_id(){return this.#cat_id}
    getCat_nome(){return this.#cat_nome}

    setCat_id(x){this.#cat_id = x}
    setCat_nome(x){this.#cat_nome = x}

    async read(){
        let sql = `SELECT * FROM categoria`
        let db = new database()
        let result = await db.ExecutaComando(sql)
        let listar = []
        result.forEach(r =>{
            listar.push(new CategoriaModel(
                r['cat_id'],
                r['cat_nome']
            ))
        })
        return listar
    }

}
module.exports = CategoriaModel