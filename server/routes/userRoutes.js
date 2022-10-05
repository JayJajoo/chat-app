const {register} = require("../controller/userController");
const {login}=require("../controller/loginController")
const {setAvatar} = require("..//controller/setAvatarController")


const router =require("express").Router();
router.post("/register",register)
router.post("/login",login)
router.post("/setAvatar/:id",setAvatar)
module.exports = router