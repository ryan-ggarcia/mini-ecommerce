// libraries
const express = require('express')
const cookiesParser = require('cookie-parser')
const expressEjsLayout = require('express-ejs-layouts')

//Config of server

const app = express()
const port = 3000

//Router app

//Router listen port

app.listen(port, () =>{
    console.log(`Server on-line in port: ${port}`) 
})