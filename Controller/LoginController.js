const UsuarioModel = require('../Models/UsuarioModel')
const bcrypt = require('bcrypt')
class LoginController {
    async login(req, res) {
        res.render('login/login', { layout: false })
    }
    async efetuarLogin(req, res) {
        let ok = false
        let msg = ''
        const { senha, email } = req.body
        if (senha != "" && email != "") {
            let validalogin = new UsuarioModel()
            validalogin = await validalogin.getEmail(email)
            if (validalogin) {
                // let hashDoBanco = validalogin.getUsu_senha
                let hashDoBanco = await bcrypt.compare(senha,validalogin.getUsu_senha)
                if(hashDoBanco){
                    let perfil = validalogin.getPer_id
                    res.cookie('UsuarioLogado',validalogin.getUsu_id)
                    ok = true
                    msg = "Sucesso! Redirecionando para a página Inicial"
                    return res.send({ok,msg,perfil})
                }else{
                    msg = 'Erro... Senha incorreta!'
                }
            }else{
                msg = 'Erro... Email incorreto!'
            }
            return res.send({ok,msg})
        }
    }
    async logout(req, res) {
        res.clearCookie('UsuarioLogado')
        res.redirect('/login')
    }
    async cadastro(req,res){
        res.render('login/cadastrar',{layout:false})
    }
}
module.exports = LoginController