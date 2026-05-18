
class AdminMiddleware{
    adminLayout(req,res,next){
        res.locals.layout = './layouts/admin'
        next()
    }
}

module.exports = AdminMiddleware