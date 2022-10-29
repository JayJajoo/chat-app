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
            sender:from
        })
        if(data){
            return res.json({msg:"message added successfully"})
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
        }).sort({updatedAt:1});
        const projectMessages=messages.map((msg)=>{
            const originalData=Buffer.from(msg.iv,"base64");
            const decipher=crypto.createDecipheriv(algorithm,key,originalData)
            let decyData=decipher.update(msg.message.text,"hex","utf-8")
            decyData+=decipher.final("utf-8")
            return{
                id:msg._id,
                fromSelf:msg.sender.toString()===from,
                message:decyData,
            }
        })
        res.json(projectMessages)
    } catch (error) {
        next(error)
        console.log(error)
    }
}
module.exports.delMessages=async (req,res,next)=>{
    console.log(req.params.id)
    try {
        const isDeleted=await messageModel.deleteOne({
            id:req.params.id.toString(),
        })
        res.json({
            msg:true,
            data:req.params.id,
        })
    } catch (error) {
        next(error)
    }
}