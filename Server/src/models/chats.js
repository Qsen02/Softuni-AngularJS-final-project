const mongoose = require("mongoose");

const ChatsSchema = new mongoose.Schema(
    {
        sender_id:{
            type: mongoose.SchemaTypes.ObjectId,
            ref:"Users"
        },
        messages:{
            type:[mongoose.SchemaTypes.ObjectId],
            ref:"Messages",
            default:[]
        }
    },
    { timestamps: { createdAt: "created_at" } }
);

const Chats=mongoose.model("Chats",ChatsSchema);

module.exports={
    Chats
}
