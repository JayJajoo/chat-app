const user = require("../model/userModel")

module.exports.getUsers=async (req,res,next)=>{
    try{
        const users=await user.find({_id:{$ne:req.params.id}}).select(
            [
                "email",
                "username",
                "avatarPhoto",
                "_id",
            ]
        )


        return res.json(users)

    }catch(error){
        next(error)
    }
}