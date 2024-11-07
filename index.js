//load .env file content into process.env by defaults

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router=require('./Route/router')
require('./DBconnection/connection')
//create an application exprss

const hrServer = express()

hrServer.use(cors())
hrServer.use(express.json())
hrServer.use(router)
// hrServerServer.use('/uploads',express.static('./uploads'))
hrServer.use('/uploads',express.static('./uploads'))
const PORT = 4000 || process.env.PORT

hrServer.listen(PORT, () => {
    console.log(`Home-rentals started at port ${PORT}..and waiting for the client request`);
})

hrServer.get('/', (req, res) => {
    res.send(`<h1>Home-rentals server running on port and waiting for client request....</h1> `)
    
})



