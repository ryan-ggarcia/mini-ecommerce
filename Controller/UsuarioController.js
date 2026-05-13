const UsuarioModel = require('../Models/UsuarioModel')
const EnderecoModel = require('../Models/EnderecoModel')
const PerfilModel = require('../Models/PerfilModel')
class UsuarioController {
    async readUser(req, res) {
        let model = new UsuarioModel()
        let user = await model.getAll()
        res.render('admin/usuario/listar', {user})
    }
    async registerView(req, res) {
        let perfil = new PerfilModel()
        perfil = await perfil.read()
        res.render('admin/usuario/cadastrar',{perfil})
    }
    async newRegister(req, res) {
        let ok = false
        let msg = ''
        let end_id = 0
        const { nome, email, senha, cpf, data, tel, perfil,} = req.body
        const { cep, uf, cidade, bairro, rua, numero, complemento } = req.body
        if(cep && uf && cidade && bairro && rua && numero && complemento){
            let model = new EnderecoModel(cidade,rua,numero,bairro,cep,uf,complemento)
            let result = await model.create()
            if(result != null){
                end_id = result
                console.log(result)
            }
        }
        if(nome && email && senha && cpf && data && tel && perfil != 0){
            if(end_id != 0){
                let model = new UsuarioModel(0,nome,email,senha,tel,cpf,perfil,end_id,'ATIVO',data)
                let result = await model.create()
                if(result != null){
                    ok = true
                    msg = 'Sucesso! Usuário cadastrado.'
                    res.send({ok,msg})
                }
            }else{
                msg = 'Erro ao cadastrar o endereco'
                res.send({ok,msg})
            }
        }
    }
}

module.exports = UsuarioController