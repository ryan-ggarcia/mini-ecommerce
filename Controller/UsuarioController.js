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
    async updateView(req,res){
        console.log(req.params.id)
        let perfil = new PerfilModel()
        let getUser = new UsuarioModel()
        getUser = await getUser.getForId(req.params.id)
        perfil = await perfil.read()
        res.render('admin/usuario/alterar', {perfil,getUser})
    }
    async newRegister(req, res) {
        let ok = false
        let msg = ''
        let end_id = 0
        const { nome, email, senha, cpf, data, tel, perfil,} = req.body
        const { cep, uf, cidade, bairro, rua, numero, complemento } = req.body
        if(cep && uf && cidade && bairro && rua && numero && complemento){
            let model = new EnderecoModel(0,cidade,rua,numero,bairro,cep,uf,complemento)
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

    async deleteUser(req,res){
        const { id } = req.body
        let msg = ''
        let ok = false
        if(id != null ){
            // Pegando o Id do endereço da tabela de usuário
            let model = new UsuarioModel()
            let end = await model.findAddress(id)
            if(end != null && end != 0){
                // Excluindo o Usuário
                let deleteUser = await model.delete(id)
                if(deleteUser){
                    //Excluindo endereço relacionado com o usuário
                    let endModel = new EnderecoModel()
                    endModel = await endModel.delete(end)
                    if(endModel){
                        ok = true
                        msg = 'Sucesso ao excluir o usuario'
                        return res.send({msg,ok})
                    }else{
                        msg = 'Algo deu errado...'
                        return res.send({msg,ok})
                    }
                }else {
                    msg = 'Não foi possível excluir o Usuário'
                    console.log(msg)
                    return res.send({msg,ok})
                }
            }else {
                msg = 'Endereço não encontrado'
                console.log(msg)
                return res.send({msg,ok})
            }
        }else {
            msg = 'Id indefinido'
            console.log(msg)
            return res.send({msg,ok})
        }
    }
}

module.exports = UsuarioController