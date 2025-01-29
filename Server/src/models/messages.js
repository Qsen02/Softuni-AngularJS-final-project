const mongoose=require("mongoose");

const MessagesSchema= new mongoose.Schema({
    owner_id:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Users"
    },
    text:{
        type:String,
    },
},{timestamps : {createdAt:"created_at"}});

const Messages= mongoose.model("Messages",MessagesSchema);

module.exports={
    Messages
}