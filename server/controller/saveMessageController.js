const savedMessagesModel=require("../model/savedMessagesModel")
const messageModel = require("../model/messageModel")
const userModel= require("../model/userModel")

const crypto=require("crypto")
const algorithm="aes-256-cbc"
const key="JeneKeHai4DinBakiHaiBekarDinOo-o"


module.exports.saveMessage=async (req,res,next)=>{
    const iv=crypto.randomBytes(16);
    const {from,to,message}=req.body;
    const cipher=crypto.createCipheriv(algorithm,key,iv);
    
    let encyData=cipher.update(message,"utf-8","hex")
    encyData+=cipher.final("hex")
    
    const base64data=Buffer.from(iv,"binary").toString("base64")

    await messageModel.findByIdAndUpdate(req.params.id.toString(),{isSaved:true})
    const data = await savedMessagesModel.create({
        iv:base64data,
        message:{text:encyData},
        reciever:to,
        sender:from,
    })
    if(data){
        return res.json({msg:"message added successfully"})
    }
    else{
        return res.json({msg:"failed to add message"})
    }
}

module.exports.getSavedMessages=async (req,res,next)=>{
    try {
        const {from,to}=req.body;
        
        const messages=await savedMessagesModel.find({
            $or:[{reciever:from},{sender:from}]
        }).sort({createdAt:1});

        const names=messages.map((msg)=>{
            return [msg.sender,msg.reciever];
        })

        for(let i=0;i<names.length;i++){
            let sender=await userModel.findById(names[i][0]);
            let reciever=await userModel.findById(names[i][1]);
            names[i][0]=sender.username
            names[i][1]=reciever.username
            names[i].push(sender.avatarPhoto)
            names[i].push(reciever.avatarPhoto)
        }
        const projectMessages=messages.map((msg,index)=>{
            const originalData=Buffer.from(msg.iv,"base64");
            const decipher=crypto.createDecipheriv(algorithm,key,originalData)
            let decyData=decipher.update(msg.message.text,"hex","utf-8")
            decyData+=decipher.final("utf-8")
            return{
                sender:msg.sender,
                senderName:names[index][0],
                senderPhoto:names[index][2],
                reciever:msg.reciever,
                recieverName:names[index][1],
                recieverPhoto:names[index][3],
                id:msg._id,
                fromSelf:msg.sender.toString()===from,
                message:decyData,
            }
        })
        res.json(projectMessages)
    } catch (error) {
        next(error)
    }   
}