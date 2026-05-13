const UsuarioModel = require('../Models/UsuarioModel')
const EnderecoModel = require('../Models/EnderecoModel')
const PerfilModel = require('../Models/PerfilModel')
class UsuarioController {
    async readUser(req, res) {
        res.render('admin/usuario/listar')
    }
    async registerView(req, res) {
        let perfil = new PerfilModel()
        perfil = await perfil.read()
        res.render('admin/usuario/cadastrar',{perfil})
    }
    async newRegister(req, res) {
        let ok = false
        let msg = ''
        const { nome, email, senha, cpf, data, tel } = req.body
        const { cep, uf, cidade, bairro, rua, numero, complemento } = req.body
        if(nome && email && senha && cpf && data && tel){
            let model = new UsuarioController(0,nome,email,senha,cpf,data,tel)

        }
    }
}

module.exports = UsuarioController