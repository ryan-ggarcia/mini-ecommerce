const UsuarioModel = require('../Models/UsuarioModel')

class UsuarioController{
    async readUser(req,res){
        res.render('admin/usuario/listar')
    }
    registerView(req,res){
        res.render('admin/usuario/cadastrar')
    }
}

module.exports = UsuarioController