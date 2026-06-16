// libraries
const express = require('express')
const cookiesParser = require('cookie-parser')
const expressEjsLayout = require('express-ejs-layouts')
// Extension from Routers
const usuarioRouter = require('./Router/usuarioAdminRouter')
const homeAdminRouter = require('./Router/painelAdminRouter')
const produtoAdminRouter = require('./Router/produtoAdminRouter')
const loginRouter = require('./Router/loginRouter')
const homeRouter = require('./Router/homeRouter')
const pedidoRouter = require('./Router/pedidoRouter')
const vendaRouter = require('./Router/vendaRouter')
const layoutAdmin = require('./Middleware/AdminMiddleware')
//Config of server
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.set('views','./Views')
app.set('layout','./layouts/client')
app.use(express.static('Public'))
app.use(express.urlencoded({extended:true}))
app.use(expressEjsLayout)
app.use(cookiesParser())
app.use(express.json())
//Router app
app.use('/', loginRouter)
app.use('/home', homeRouter)
app.use('/pedido', pedidoRouter)
//Layout Admin route
let admin = new layoutAdmin()
app.use(admin.adminLayout)
app.use('/admin', usuarioRouter)
app.use('/admin', homeAdminRouter)
app.use('/admin', produtoAdminRouter)
app.use('/admin',vendaRouter)
// Config global link
global.CAMINHO_IMG = '/image/produtos/'
global.CAMINHO_ABS = __dirname + '/Public/image/produtos/'

//Router listen port
app.listen(port, () =>{
    console.log(`Server on-line in port: ${port}`) 
})