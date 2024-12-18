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
    }
},{ timestamps: { createdAt: "created_at" } })

const Users=mongoose.model("Users",userSchema);

module.exports={
    Users
}