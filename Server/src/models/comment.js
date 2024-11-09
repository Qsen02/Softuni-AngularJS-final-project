const mongoose = require("mongoose");

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    ownerId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Users"
    },
    likes:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Users",
        default:[]
    },
    postId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Posts"
    }
})

const Comments=mongoose.model("Comments",commentSchema);

module.exports={
    Comments
}