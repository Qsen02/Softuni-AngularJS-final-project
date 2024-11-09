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
        default:""
    },
    password:{
        type:String,
        require:true,
        unique:true
    }
})

const Users=mongoose.model("Users",userSchema);

module.exports={
    Users
}