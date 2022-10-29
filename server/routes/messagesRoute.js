const {addMessage,getMessages,delMessages,likeMessages} = require("../controller/messagesController");

const router =require("express").Router();

router.post("/addmsg/",addMessage)
router.post("/getmsg/",getMessages)
router.delete("/delmsg/:id",delMessages)
router.put("/likemsg/:id",likeMessages)

module.exports = router