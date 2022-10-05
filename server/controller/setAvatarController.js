const user = require("../model/userModel")

module.exports.setAvatar = async (req, res,next) => {
    try {
        const id=req.params.id;
        const avt_img=req.body.image;
        const usr_data=await user.findByIdAndUpdate(id,{
            isAvatarPhotoSet:true,
            avatarPhoto:avt_img
        })
        res.status(200).json({isSet:usr_data.isAvatarPhotoSet,image:usr_data.avatarPhoto});
    }catch(err){
        console.log(err);
    }
}