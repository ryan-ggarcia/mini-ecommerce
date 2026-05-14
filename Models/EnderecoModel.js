const database = require('../DB/database')

class EnderecoModel{
    #end_id
    #end_cidade
    #end_rua
    #end_numero
    #end_bairro
    #end_cep
    #end_uf
    #end_complemento

    constructor(end_id,end_cidade,end_rua,end_numero,end_bairro,end_cep,end_uf,end_complemento){
        this.#end_id = end_id
        this.#end_cidade = end_cidade
        this.#end_rua = end_rua
        this.#end_numero = end_numero
        this.#end_bairro = end_bairro
        this.#end_cep = end_cep
        this.#end_uf = end_uf
        this.#end_complemento = end_complemento
    }
    get getEnd_id() { return this.#end_id; }
    set setEnd_id(end_id) { this.#end_id = end_id; }

    get getEnd_cidade() { return this.#end_cidade; }
    set setEnd_cidade(end_cidade) { this.#end_cidade = end_cidade; }

    get getEnd_rua() { return this.#end_rua; }
    set setEnd_rua(end_rua) { this.#end_rua = end_rua; }

    get getEnd_numero() { return this.#end_numero; }
    set setEnd_numero(end_numero) { this.#end_numero = end_numero; }

    get getEnd_bairro() { return this.#end_bairro; }
    set setEnd_bairro(end_bairro) { this.#end_bairro = end_bairro; }

    get getEnd_cep() { return this.#end_cep; }
    set setEnd_cep(end_cep) { this.#end_cep = end_cep; }

    get getEnd_uf() { return this.#end_uf; }
    set setEnd_uf(end_uf) { this.#end_uf = end_uf; }

    get getEnd_complemento() { return this.#end_complemento; }
    set setEnd_complemento(end_complemento) { this.#end_complemento = end_complemento; }
    async create(){
        let sql = `INSERT INTO endereco (end_cidade, end_rua, end_numero, end_bairro, end_cep, end_uf, end_complemento) values (?,?,?,?,?,?,?)`
        let values = [
            this.#end_cidade,
            this.#end_rua,
            this.#end_numero,
            this.#end_bairro,
            this.#end_cep,
            this.#end_uf,
            this.#end_complemento
        ]
        let db = new database()
        db = await db.ExecutaComandoLastInserted(sql,values)
        return db 
        
    }
    async update(){
        let sql = `UPDATE endereco SET end_cidade = ?, end_rua = ?, end_numero = ?, end_bairro = ?, end_cep = ?, end_uf = ?, end_complemento = ? WHERE end_id = ?`
        let values = [
            this.#end_cidade,
            this.#end_rua,
            this.#end_numero,
            this.#end_bairro,
            this.#end_cep,
            this.#end_uf,
            this.#end_complemento,
            this.#end_id
        ]
        let db = new database()
        db = await db.ExecutaComandoNonQuery(sql,values)
        return db 
        
    }
    async delete(id){
        let sql = `DELETE FROM endereco WHERE end_id = ?`
        let values = [id]
        let db = new database()
        db = await db.ExecutaComandoNonQuery(sql,values)
        return db 
        
    }
    async findById(id){
        let sql = `SELECT * FROM endereco WHERE end_id = ?`
        let values = [id]
        let db = new database()
        db = await db.ExecutaComando(sql,values)
        return db 
    }   
    async findAll(){
        let sql = `SELECT * FROM endereco`
        let db = new database()
        db = await db.ExecutaComando(sql)
        let lista = new EnderecoModel(
            db[0]['end_id'],
            db[0]['end_cidade'],
            db[0]['end_rua'],
            db[0]['end_numero'],
            db[0]['end_bairro'],
            db[0]['end_cep'],
            db[0]['end_uf'],
            db[0]['end_complemento']
        )
        return lista
    }
}
module.exports = EnderecoModel