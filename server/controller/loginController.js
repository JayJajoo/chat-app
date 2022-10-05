const user = require("../model/userModel")
const bcrypt = require("bcrypt")

module.exports.login= async (req,res)=>{
    try{
        const {username,password}=req.body;
        const person = await user.findOne({username})

        if(person){
            if(await bcrypt.compare(password,person.password)==true){
                res.json({person,status:true})
            }
            else{
                res.json({msg:"Wrong Password",status:false})
            }
        }
        else{
            res.json({msg:"No user with this username exists",status:false})
        }
    }catch(err){
        console.log(err);
    }
}