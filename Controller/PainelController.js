const UsuarioModel = require('../Models/UsuarioModel')
class PainelController{
    async homePage(req,res){
        let usuario = new UsuarioModel()
        usuario = await usuario.getForId(req.cookies.UsuarioLogado)
        res.render('admin/home', { pagina: 'Dashboard', usuNome: usuario.getUsu_nome })
    }
}

module.exports = PainelController