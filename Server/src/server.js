const express=require("express");
const { expressConfig } = require("./config/express");
const { runDB } = require("./config/mongoose");

const port=3000;

const app=express();

async function start(){
    await runDB();

    expressConfig(app);

    app.listen(port,()=>{
        console.log(`Server is listening on ${port} port!`);
    })
}

start();