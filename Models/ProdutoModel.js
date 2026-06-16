const database = require('../DB/database')

class ProdutoModel{
    #pro_id
    #pro_nome
    #pro_desc
    #pro_image
    #pro_preco
    #pro_desconto
    #pro_quantidade
    #cat_id
    #marca_id
    #pro_validade
    #pro_status
    #cat_nome
    #marca_nome

    constructor(pro_id,pro_nome,pro_desc,pro_image,pro_preco,pro_quantidade,cat_id,marca_id,pro_validade,pro_status,pro_desconto,cat_nome,marca_nome){
        this.#pro_id = pro_id
        this.#pro_nome = pro_nome
        this.#pro_desc = pro_desc
        this.#pro_image = pro_image
        this.#pro_preco = pro_preco
        this.#pro_desconto = pro_desconto ?? 0
        this.#pro_quantidade = pro_quantidade
        this.#cat_id = cat_id
        this.#marca_id = marca_id
        this.#pro_validade = pro_validade
        this.#pro_status = pro_status
        this.#cat_nome = cat_nome
        this.#marca_nome = marca_nome
    }

    getPro_id(){return this.#pro_id}
    getPro_nome(){return this.#pro_nome}
    getPro_desc(){return this.#pro_desc}
    getPro_image(){return this.#pro_image}
    getPro_preco(){return this.#pro_preco}
    getPro_desconto(){return this.#pro_desconto}
    getPro_quantidade(){return this.#pro_quantidade}
    getCat_id(){return this.#cat_id}
    getMarca_id(){return this.#marca_id}
    getPro_validade(){return this.#pro_validade}
    getPro_status(){return this.#pro_status}
    getCat_nome(){return this.#cat_nome}
    getMarca_nome(){return this.#marca_nome}

    // Preço final já com o desconto (em %) aplicado
    getPrecoFinal(){
        let desc = Number(this.#pro_desconto) || 0
        return Number(this.#pro_preco) * (1 - desc / 100)
    }
    emPromocao(){
        return (Number(this.#pro_desconto) || 0) > 0
    }

    setPro_id(pro_id){this.#pro_id = pro_id}
    setPro_nome(pro_nome){this.#pro_nome = pro_nome}
    setPro_desc(pro_desc){this.#pro_desc = pro_desc}
    setPro_image(pro_image){this.#pro_image = pro_image}
    setPro_preco(pro_preco){this.#pro_preco = pro_preco}
    setPro_desconto(pro_desconto){this.#pro_desconto = pro_desconto}
    setPro_quantidade(pro_quantidade){this.#pro_quantidade = pro_quantidade}
    setCat_id(cat_id){this.#cat_id = cat_id}
    setMarca_id(marca_id){this.#marca_id = marca_id}
    setPro_validade(x){this.#pro_validade = x}
    setPro_status(x){this.#pro_status = x}

    async create(){
        let sql = `INSERT INTO produto (pro_nome,pro_desc,pro_image,pro_preco,pro_desconto,pro_quantidade,cat_id,marca_id,pro_status) values (?,?,?,?,?,?,?,?,?)`
        let values = [this.#pro_nome,this.#pro_desc,this.#pro_image ,this.#pro_preco,this.#pro_desconto,this.#pro_quantidade,this.#cat_id,this.#marca_id,this.#pro_status]
        let db = new database()
        let result = await db.ExecutaComandoNonQuery(sql,values)
        return result
    }
    async getAll(){
        let sql = `SELECT p.*, c.cat_nome, m.marca_nome
                   FROM produto p
                   LEFT JOIN categoria c ON p.cat_id = c.cat_id
                   LEFT JOIN marca m ON p.marca_id = m.marca_id`
        let db = new database()
        let result = await db.ExecutaComando(sql)
        let listar = []
        result.forEach(r =>{
            listar.push(this.#montar(r))
        })
        return listar
    }
    async update(){
        let sql = `UPDATE produto SET pro_nome=?,pro_desc=?,pro_image=?,pro_preco=?,pro_desconto=?,pro_quantidade=?,cat_id=?,marca_id=?,pro_status=? WHERE pro_id=?`
        let values = [this.#pro_nome,this.#pro_desc,this.#pro_image,this.#pro_preco,this.#pro_desconto,this.#pro_quantidade,this.#cat_id,this.#marca_id,this.#pro_status,this.#pro_id]
        let db = new database()
        let result = await db.ExecutaComandoNonQuery(sql,values)
        return result
    }
    async getForId(id){
        let sql = `SELECT p.*, c.cat_nome, m.marca_nome
                   FROM produto p
                   LEFT JOIN categoria c ON p.cat_id = c.cat_id
                   LEFT JOIN marca m ON p.marca_id = m.marca_id
                   WHERE p.pro_id = ?`
        let value = [id]
        let db = new database()
        let result = await db.ExecutaComando(sql,value)
        return this.#montar(result[0])
    }

    // Monta um ProdutoModel a partir de uma linha do banco (com nomes de categoria/marca)
    #montar(r){
        return new ProdutoModel(
            r['pro_id'],
            r['pro_nome'],
            r['pro_desc'],
            r['pro_image'] != null ? r['pro_image'] : 'sem-imagem.png',
            r['pro_preco'],
            r['pro_quantidade'],
            r['cat_id'],
            r['marca_id'],
            r['pro_validade'],
            r['pro_status'],
            r['pro_desconto'],
            r['cat_nome'],
            r['marca_nome']
        )
    }
    async deletar(id){
        let sql = `DELETE FROM produto WHERE pro_id = ?`
        let value = [id]
        let db = new database()
        let result = await db.ExecutaComandoNonQuery(sql,value)
        return result
    }
}
module.exports = ProdutoModel