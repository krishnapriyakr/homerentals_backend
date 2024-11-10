require('dotenv').config();
const mongoose = require('mongoose')
const connectionString = process.env.DATABASE;
if (!connectionString) {
    console.error('mongobd connection string is missing');
    process.exit(1);
    
}
mongoose.connect(connectionString).then(() => {
    console.log("mongoDB connected successfully to hrServer");
}).catch((err) => {
    console.log(`mongoDB connection failed!!Error:${err}`);
})