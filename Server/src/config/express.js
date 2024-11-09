const express=require("express");
const { setCors } = require("../middlewares.js/cors");
const { session } = require("../middlewares.js/session");

function expressConfig(app){
    app.use(setCors());
    app.use(session());
    app.use(express.json());
}

module.exports={
    expressConfig
}