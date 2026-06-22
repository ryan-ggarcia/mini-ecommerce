const database = require('../DB/database')

class UsuarioModel {
    #usu_id
    #usu_nome
    #usu_email
    #usu_senha
    #usu_telefone
    #usu_cpf
    #per_id
    #end_id
    #usu_status
    #usu_data

    constructor(usu_id, usu_nome, usu_email, usu_senha, usu_telefone, usu_cpf, per_id, end_id, usu_status, usu_data) {
        this.#usu_id = usu_id;
        this.#usu_nome = usu_nome;
        this.#usu_email = usu_email;
        this.#usu_senha = usu_senha;
        this.#usu_telefone = usu_telefone;
        this.#usu_cpf = usu_cpf;
        this.#per_id = per_id;
        this.#end_id = end_id;
        this.#usu_status = usu_status;
        this.#usu_data = usu_data;
    }

    get getUsu_id() { return this.#usu_id; }
    set setUsu_id(usu_id) { this.#usu_id = usu_id; }

    get getUsu_nome() { return this.#usu_nome; }
    set setUsu_nome(usu_nome) { this.#usu_nome = usu_nome; }

    get getUsu_email() { return this.#usu_email; }
    set setUsu_email(usu_email) { this.#usu_email = usu_email; }

    get getUsu_senha() { return this.#usu_senha; }
    set setUsu_senha(usu_senha) { this.#usu_senha = usu_senha; }

    get getUsu_telefone() { return this.#usu_telefone; }
    set setUsu_telefone(usu_telefone) { this.#usu_telefone = usu_telefone; }

    get getUsu_cpf() { return this.#usu_cpf; }
    set setUsu_cpf(usu_cpf) { this.#usu_cpf = usu_cpf; }

    get getPer_id() { return this.#per_id; }
    set setPer_id(per_id) { this.#per_id = per_id; }

    get getEnd_id() { return this.#end_id; }
    set setEnd_id(end_id) { this.#end_id = end_id; }

    get getUsu_status() { return this.#usu_status; }
    set setUsu_status(usu_status) { this.#usu_status = usu_status; }

    get getUsu_data() { return this.#usu_data; }
    set setUsu_data(usu_data) { this.#usu_data = usu_data; }

    async create() {
        let sql = `INSERT INTO usuario (usu_nome, usu_email, usu_senha, usu_telefone, usu_cpf, per_id, end_id, usu_data) values (?,?,?,?,?,?,?,?)`
        let values = [
            this.#usu_nome,
            this.#usu_email,
            this.#usu_senha,
            this.#usu_telefone,
            this.#usu_cpf,
            this.#per_id,
            this.#end_id,
            this.#usu_data
        ]
        let db = new database()
        db = await db.ExecutaComandoNonQuery(sql, values)
        return db
    }
    async update() {
        let sql = `UPDATE usuario SET usu_nome = ?, usu_senha = ?, usu_telefone = ?, usu_cpf = ?, per_id = ?, end_id = ?, usu_status = ?, usu_data = ?
        WHERE usu_id = ?`
        let values = [
            this.#usu_nome,
            this.#usu_senha,     // ✅
            this.#usu_telefone,  // ✅
            this.#usu_cpf,
            this.#per_id,
            this.#end_id,
            this.#usu_status,
            this.#usu_data,
            this.#usu_id
        ]
        let result = new database()
        result = await result.ExecutaComandoNonQuery(sql, values)
        return result
    }
    async getAll() {
        let sql = `SELECT * FROM usuario`
        let db = new database()
        db = await db.ExecutaComando(sql)
        let lista = []
        db.forEach(l => {
            lista.push(new UsuarioModel(
                l['usu_id'],
                l['usu_nome'],
                l['usu_email'],
                l['usu_senha'],
                l['usu_telefone'],
                l['usu_cpf'],
                l['per_id'],
                l['end_id'],
                l['usu_status'],
                l['usu_data']
            ))
        })
        return lista
    }
    async getForId(id) {
        let sql = `SELECT * FROM usuario WHERE usu_id = ? OR usu_nome LIKE ?`
        let values = [id, `%${id}%`]
        let db = new database()
        let result = await db.ExecutaComando(sql, values)
        let lista = new UsuarioModel(
            result[0]['usu_id'],
            result[0]['usu_nome'],
            result[0]['usu_email'],
            result[0]['usu_senha'],
            result[0]['usu_telefone'],
            result[0]['usu_cpf'],
            result[0]['per_id'],
            result[0]['end_id'],
            result[0]['usu_status'],
            result[0]['usu_data']
        )
        return lista
    }
    async getEmail(email) {
        let sql = `SELECT usu_id,usu_email,usu_senha, per_id FROM usuario WHERE usu_email = ?`
        let values = [email]
        let db = new database()
        db = await db.ExecutaComando(sql, values)
        let lista = new UsuarioModel(
            db[0]['usu_id'],
            0,
            db[0]['usu_email'],
            db[0]['usu_senha'],
            0,
            0,
            db[0]['per_id'],
            0,
            0,
            0
        )
        return lista
    }
    async delete(id) {
        let sql = `DELETE FROM usuario WHERE usu_id = ? `
        let values = [id]
        let db = new database()
        let result = await db.ExecutaComandoNonQuery(sql, values)
        return result
    }
   async findAddress(id) {
    let sql = `SELECT end_id FROM usuario WHERE usu_id = ?`
    let value = [id]
    let banco = new database()
    let result = await banco.ExecutaComando(sql, value)

    if (result.length > 0) {
        return result[0]['end_id']
    }
    return null
}
}
module.exports = UsuarioModel