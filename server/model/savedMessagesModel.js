const mongoose=require("mongoose");

const savedMessageSchema=new mongoose.Schema({
    iv:String,
    message:{
        text:{
            type:String,
            required:true
        },
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
  },
  {
    timestamps:true,
  },
)

module.exports=mongoose.model("savedMessages",savedMessageSchema)