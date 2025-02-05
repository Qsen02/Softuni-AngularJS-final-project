const express=require("express");
const { expressConfig } = require("./config/express");
const { runDB } = require("./config/mongoose");
const { routerConfig } = require("./config/router");
const { createServer }=require("node:http");
const { socketConnection } = require("./config/socketConnection");

const port=process.env.PORT || 3000;

const app=express();
const httpServer=createServer(app);

async function start(){
    await runDB();

    expressConfig(app);
    routerConfig(app);
    socketConnection(httpServer);

    httpServer.listen(port,()=>{
        console.log(`Server is listening on ${port} port!`);
    })
}

start();