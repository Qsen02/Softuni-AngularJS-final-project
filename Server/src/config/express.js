const express=require("express");
const { setCors } = require("../middlewares.js/cors");

function expressConfig(app){
    app.use(setCors());
    app.use(express.json());
}

module.exports={
    expressConfig
}