const messageModel = require("../model/messageModel")
const crypto=require("crypto")
const algorithm="aes-256-cbc"
const key="JeneKeHai4DinBakiHaiBekarDinOo-o"

module.exports.addMessage=async (req,res,next)=>{
    try {
        const iv=crypto.randomBytes(16);
        const {from,to,message}=req.body;
        const cipher=crypto.createCipheriv(algorithm,key,iv);
        
        let encyData=cipher.update(message,"utf-8","hex")
        encyData+=cipher.final("hex")
        
        const base64data=Buffer.from(iv,"binary").toString("base64")

        const data = await messageModel.create({
            iv:base64data,
            message:{text:encyData},
            users:[from,to],
            sender:from,
            isLiked:false,
            isSaved:false,
        })
        if(data){
            return res.json({msg:"message added successfully",id:data._id,isLiked:data.isLiked,isSaved:data.isSaved})
        }
        else{
            return res.json({msg:"failed to add message"})
        }
    } catch (error) {
        next(error)
        console.log(error)
    }
}
module.exports.getMessages=async (req,res,next)=>{
    try {
        const {from,to}=req.body;
        const messages=await messageModel.find({
            users:{
                $all:[from,to]
            }
        }).sort({createdAt:1});
        const projectMessages=messages.map((msg)=>{
            const originalData=Buffer.from(msg.iv,"base64");
            const decipher=crypto.createDecipheriv(algorithm,key,originalData)
            let decyData=decipher.update(msg.message.text,"hex","utf-8")
            decyData+=decipher.final("utf-8")
            return{
                id:msg._id,
                fromSelf:msg.sender.toString()===from,
                message:decyData,
                isLiked:msg.isLiked,
                isSaved:msg.isSaved
            }
        })
        res.json(projectMessages)
    } catch (error) {
        next(error)
        console.log(error)
    }
}
module.exports.delMessages=async (req,res,next)=>{
    try {
        const isDeleted=await messageModel.findByIdAndDelete(req.params.id.toString())
        res.json({
            success:true,
            data:req.params.id,
        })
    } catch (error) {
        next(error)
    }
}

module.exports.likeMessages=async (req,res,next)=>{
    console.log(req.params.id.toString())
    try {
        const likeUpdated=await messageModel.findByIdAndUpdate(
            req.params.id.toString(),{isLiked:true}
        )
        if(likeUpdated.modifiedCount===1){
            res.json({
                success:true,
            })
        }
        else{
            res.json({
                success:false,
            })
        }
    } catch (error) {
        next(error)
    }
}