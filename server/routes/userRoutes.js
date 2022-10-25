const {register} = require("../controller/userController");
const {login}=require("../controller/loginController")
const {setAvatar} = require("../controller/setAvatarController")
const {getUsers} = require("../controller/allUsers")

const router =require("express").Router();
router.post("/register",register)
router.post("/login",login)
router.post("/setAvatar/:id",setAvatar)
router.get("/allUsers/:id",getUsers)
module.exports = router