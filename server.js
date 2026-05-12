// libraries
const express = require('express')
const cookiesParser = require('cookie-parser')
const expressEjsLayout = require('express-ejs-layouts')
// Extension from Routers
const usuarioRouter = require('./Router/usuarioAdminRouter')
const homeAdminRouter = require('./Router/painelAdminRouter')
const layoutAdmin = require('./Middleware/AdminMiddleware')
//Config of server
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.set('views','./Views')
app.set('layout','./layouts/user')
app.set(express.static('Public'))
app.use(express.urlencoded({extended:true}))
app.use(expressEjsLayout)
app.use(cookiesParser())
app.use(express.json())
//Router app
//Layout Admin route
let admin = new layoutAdmin()
app.use(admin.adminLayout)
app.use('/admin', usuarioRouter)
app.use('/admin', homeAdminRouter)
//Router listen port
app.listen(port, () =>{
    console.log(`Server on-line in port: ${port}`) 
})