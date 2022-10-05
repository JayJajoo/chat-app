const user = require("../model/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const usernameChk = await user.findOne({ username })

        if (usernameChk) {
            return res.json({ msg: "User name alredy used", status: false });
        }
        const emailChk = await user.findOne({ email })
        
        if (emailChk) {
            return res.json({ msg: "Email already used", status: false })
        }
        
        const hashed_password = await bcrypt.hash(password, 10);

        const User =await user.create({
            email,
            username,
            password: hashed_password,
        })

        console.log(User)

        delete User.password
        
        return res.json({User,status:true})

    }catch(err){
        console.log(err);
    }
}