const {saveMessage,getSavedMessages} = require("../controller/saveMessageController");
const router =require("express").Router();
router.post("/saveMsg/:id",saveMessage)
router.post("/getSavedMsg",getSavedMessages)
module.exports = router