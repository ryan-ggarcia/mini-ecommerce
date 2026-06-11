
class PainelController{
    async homePage(req,res){
        res.render('admin/home', { pagina: 'Dashboard' })
    }
}

module.exports = PainelController