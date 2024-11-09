const mongoose=require("mongoose");
const {User}=require("../models/user");

const localDB="mongodb://127.0.0.1:27017/Social-media";

async function runDB(){
    await mongoose.connect(localDB);
    console.log("Database is running!");
}

module.exports={
    runDB
}