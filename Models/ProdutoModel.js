const database = require('../DB/database')

class ProdutoModel{
    #pro_id
    #pro_nome
    #pro_desc
    #pro_image
    #pro_preco
    #pro_quantidade
    #cat_id
    #marca_id
    #pro_validade
    #pro_status

    constructor(pro_id,pro_nome,pro_desc,pro_image,pro_preco,pro_quantidade,cat_id,marca_id,pro_validade,pro_status){
        this.#pro_id = pro_id
        this.#pro_nome = pro_nome
        this.#pro_desc = pro_desc
        this.#pro_image = pro_image
        this.#pro_preco = pro_preco
        this.#pro_quantidade = pro_quantidade
        this.#cat_id = cat_id
        this.#marca_id = marca_id
        this.#pro_validade = pro_validade
        this.#pro_status = pro_status
    }

    getPro_id(){return this.#pro_id}
    getPro_nome(){return this.#pro_nome}
    getPro_desc(){return this.#pro_desc}
    getPro_image(){return this.#pro_image}
    getPro_preco(){return this.#pro_preco}
    getPro_quantidade(){return this.#pro_quantidade}
    getCat_id(){return this.#cat_id}
    getMarca_id(){return this.#marca_id}
    getPro_validade(){return this.#pro_validade}
    getPro_status(){return this.#pro_status}

    setPro_id(pro_id){this.#pro_id = pro_id}
    setPro_nome(pro_nome){this.#pro_nome = pro_nome}
    setPro_desc(pro_desc){this.#pro_desc = pro_desc}
    setPro_image(pro_image){this.#pro_image = pro_image}
    setPro_preco(pro_preco){this.#pro_preco = pro_preco}
    setPro_quantidade(pro_quantidade){this.#pro_quantidade = pro_quantidade}
    setCat_id(cat_id){this.#cat_id = cat_id}
    setMarca_id(marca_id){this.#marca_id = marca_id}
    setPro_validade(x){this.#pro_validade = x}
    setPro_status(x){this.#pro_status = x}

    async create(){
        let sql = `INSERT INTO produto (pro_nome,pro_desc,pro_image,pro_preco,pro_quantidade,cat_id,marca_id,pro_status) values (?,?,?,?,?,?,?,?)`
        let values = [this.#pro_nome,this.#pro_desc,this.#pro_image ,this.#pro_preco,this.#pro_quantidade,this.#cat_id,this.#marca_id,this.#pro_status]
        let db = new database()
        let result = await db.ExecutaComandoNonQuery(sql,values)
        return result
    }
    async getAll(){
        let sql = `SELECT * FROM produto`
        let db = new database()
        let result = await db.ExecutaComando(sql)
        let listar = []
        let image = ''
        result.forEach(r =>{
            if(r['pro_image'] != null)
                image = r['pro_image']
            else
                image = 'sem-imagem.png'
            listar.push(new ProdutoModel(
               r['pro_id'],
               r['pro_nome'],
               r['pro_desc'],
               image,
               r['pro_preco'],
               r['pro_quantidade'],
               r['cat_id'],
               r['marca_id'],
               r['pro_validade'],
               r['pro_status']
            ))
        })
        return listar
    }  
    async update(){
        let sql = `UPDATE produto SET pro_nome=?,pro_desc=?,pro_image=?,pro_preco=?,pro_quantidade=?,cat_id=?,marca_id=?,pro_status=? WHERE pro_id=?`
        let values = [this.#pro_nome,this.#pro_desc,this.#pro_image,this.#pro_preco,this.#pro_quantidade,this.#cat_id,this.#marca_id,this.#pro_status,this.#pro_id]
        let db = new database()
        let result = await db.ExecutaComandoNonQuery(sql,values)
        return result
    }
    async getForId(id){
        let sql = `SELECT * FROM produto WHERE pro_id = ?`
        let value = [id]
        let db = new database()
        let result = await db.ExecutaComando(sql,value)
        let produto = new ProdutoModel(
            result[0]['pro_id'],
            result[0]['pro_nome'],
            result[0]['pro_desc'],
            result[0]['pro_image'],
            result[0]['pro_preco'],
            result[0]['pro_quantidade'],
            result[0]['cat_id'],
            result[0]['marca_id'],
            result[0]['pro_status']
        )
        return produto
    }
    async deletar(id){
        let sql = `DELETE FROM prduto WHERE pro_id = ?`
        let value = [id]
        let db = new database()
        let result = await db.ExecutaComandoNonQuery(sql,value)
        return result
    }
}
module.exports = ProdutoModel