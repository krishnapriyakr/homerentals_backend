
const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(() => {
    console.log("mongoDB connected successfully to hrServer");
}).catch((err) => {
    console.log(`mongoDB connection failed!!Error:${err}`);
})