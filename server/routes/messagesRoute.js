const {addMessage,getMessages,delMessages} = require("../controller/messagesController");

const router =require("express").Router();

router.post("/addmsg/",addMessage)
router.post("/getmsg/",getMessages)
router.delete("/delmsg/:id",delMessages)

module.exports = router