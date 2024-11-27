const express=require("express");
const { setCors } = require("../middlewares.js/cors");
const { session } = require("../middlewares.js/session");
const cookieParser = require("cookie-parser");

const secret="Super secret cookie";

function expressConfig(app){
    app.use(setCors());
    app.use(cookieParser(secret));
    app.use(session());
    app.use(express.json());
}

module.exports={
    expressConfig
}