const UsuarioModel = require('../Models/UsuarioModel')
const EnderecoModel = require('../Models/EnderecoModel')
class UsuarioController{
    async readUser(req,res){
        res.render('admin/usuario/listar')
    }
    registerView(req,res){
        res.render('admin/usuario/cadastrar')
    }
    async newRegister(req,res){

    }
}

module.exports = UsuarioController