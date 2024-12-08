const mongoose=require("mongoose");
const {Users}=require("../models/user");
const {Posts}=require("../models/post");
const {Comments}=require("../models/comment");

// const localDB="mongodb://127.0.0.1:27017/Social-media";

async function runDB(){
    await mongoose.connect(process.env.PRODUCTION_DB);
    console.log("Database is running!");
}

module.exports={
    runDB
}