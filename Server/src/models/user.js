const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    profileImage:{
        type:String,
        default:"http://"
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    chats:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Chats",
        default:[]
    },
    requests:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Requests",
        default:[]
    },
    unreadedChats:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Chats",
        default:[]
    },
    unreadedMessages:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Messages",
        default:[]
    }
},{ timestamps: { createdAt: "created_at" } })

const Users=mongoose.model("Users",userSchema);

module.exports={
    Users
}