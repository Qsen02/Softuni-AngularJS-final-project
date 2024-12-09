const express=require("express");
const { expressConfig } = require("./config/express");
const { runDB } = require("./config/mongoose");
const { routerConfig } = require("./config/router");

const port=process.env.PORT || 3000;

const app=express();

async function start(){
    await runDB();

    expressConfig(app);
    routerConfig(app);

    app.listen(port,()=>{
        console.log(`Server is listening on ${port} port!`);
    })
}

start();