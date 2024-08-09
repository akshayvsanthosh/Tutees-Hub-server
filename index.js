require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./db/connection')

const sPServer = express()
sPServer.use(cors())
sPServer.use(express.json())
sPServer.use(router)
sPServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

sPServer.listen(PORT,()=>{
    console.log("sPServer started");
})

sPServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>SPSERVER STARTED AT ${PORT}</h1>`)
})