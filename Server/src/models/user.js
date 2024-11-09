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
        type:String
    },
    password:{
        type:String,
        require:true,
        unique:true
    }
})

const User=mongoose.model("Users",userSchema);

module.exports={
    User
}