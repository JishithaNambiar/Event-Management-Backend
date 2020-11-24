const express = require('express');
const mongoose = require('mongoose'); 
const app =express();
const eventRouter =require( './route/eventRouter');
const config = require("config");


if(!config.get("jwtPrivateKey")){
    console.log("Fatal Error: jwtprivatekey not defined ");
    process.exit(1);
}

require("./start/cors")(app)
app.use(express.json())
app.use('/api',eventRouter)

mongoose.connect('mongodb://localhost/session12',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) 
.then(console.log("connected to db"))
.catch((error) => console.log(error));

const port = 7000
app.listen(port,console.log(`listening to port ${port}`))