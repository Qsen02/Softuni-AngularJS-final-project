const mongoose=require("mongoose");
const {Users}=require("../models/user");
const {Posts}=require("../models/post");
const {Comments}=require("../models/comment");
const {Chats}=require("../models/chats");
const {Messages}=require("../models/messages");
const {Requests}=require("../models/requests");

const localDB="mongodb://127.0.0.1:27017/Social-media";
const productionDB=process.env.PRODUCTION_DB;

async function runDB(){
    await mongoose.connect(localDB);
    console.log("Database is running!");
}

module.exports={
    runDB
}