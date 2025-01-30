const mongoose=require("mongoose");

const requestsSchema=new mongoose.Schema({
    sender_id:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Users"
    }
},{timestamps:{createdAt:"created_at"}});

const Requests=mongoose.model("Requests",requestsSchema);

module.exports={
    Requests
}