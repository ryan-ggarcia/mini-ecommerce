const ProdutoModel = require('../Models/ProdutoModel')
const CategoriaModel = require('../Models/CategoriaModel')
const MarcaModel = require('../Models/MarcaModel')
class ProdutoController{
    async readProduto(req,res){
        let model = new ProdutoModel()
        let produto = await model.getAll() 
        res.render('admin/produto/listar',{produto})
    }
    async registerView(req,res){
        let cat = new CategoriaModel()
        let marca = new MarcaModel()
        cat = await cat.read()
        marca = await marca.read()
        res.render('admin/produto/cadastrar',{cat,marca})
    }
    async updateView(req,res){
        let produto = new ProdutoModel()
        let cat = new CategoriaModel()
        let marca = new MarcaModel()
        produto = await produto.getForId(req.params.id)
        cat = await cat.read()
        marca = await marca.read()
        res.render('admin/produto/alterar', {produto,cat,marca})
    }
    async newRegister(req,res){
        let ok = true
        let msg = ''
        if(req.body.nome && req.body.preco && req.body.quantidade && req.body.descricao
            && req.body.status && req.body.categoria && req.body.marca && req.file ){
                // console.log(req.file.filename)
                let model = new ProdutoModel(0,req.body.nome,req.body.descricao,req.file.filename
                    ,req.body.preco,req.body.quantidade,req.body.categoria,req.body.marca,req.body.validade,
                    req.body.status)
                let result = await model.create()
                if(result){
                    msg = 'Sucesso ao cadastrar o produto!'
                    return res.send({msg,ok})
                }else{
                    ok = false
                    msg = 'Não foi possível realizar o cadastro de produto'
                    return res.send({msg,ok})
                }
        }
    }
    async update(req,res){
        let ok = true
        let msg = ''
        if(req.body.id && req.body.nome && req.body.preco && req.body.quantidade && req.body.descricao
            && req.body.status && req.body.categoria && req.body.marca){
                if(req.file != null){
                    let findFile = new ProdutoModel()
                    findFile = await findFile.getForId(req.body.id)
                    let img_Old = findFile.getPro_status()
                    let model = new ProdutoModel(req.body.id,req.body.nome,req.body.descricao,img_Old
                    ,req.body.preco,req.body.quantidade,req.body.categoria,req.body.marca,req.body.validade,
                    req.body.status)
                    model = await model.update()
                    if(model){
                        msg = 'Sucesso!'
                        return res.send({msg,ok})
                    }else{
                         msg = 'Erro...'
                        ok = false
                        return res.send({msg,ok})
                    }
                }else{
                    let model = new ProdutoModel(req.body.id,req.body.nome,req.body.descricao,req.file.filename
                    ,req.body.preco,req.body.quantidade,req.body.categoria,req.body.marca,req.body.validade,
                    req.body.status)
                    model = await model.update()
                    if(model){
                        msg = 'Sucesso!'
                        return res.send({msg,ok})
                    }else{
                        msg = 'Erro...'
                        ok = false
                        return res.send({msg,ok})
                    }
                }
            }
    }
}
module.exports = ProdutoController