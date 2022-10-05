const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        max:60,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        max:20,
        unique:false,
    },
    isAvatarPhotoSet:{
        type:Boolean,
        default:false,
    },
    avatarPhoto:{
        type:String,
        default:"",
    }
})

module.exports=mongoose.model("Users",userSchema)