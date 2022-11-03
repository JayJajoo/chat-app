const userRoutes = require("./routes/userRoutes")
const messageRoutes=require("./routes/messagesRoute")
const saveMsgRoutes=require("./routes/saveMsgRoute")

const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const socket = require("socket.io")

const app=express();
require("dotenv").config();

app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/save",saveMsgRoutes)

app.options("http://api.multiavatar.com/45678945/", cors(), (req, res) => {
    res.sendStatus(200);
});

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Database connection successful")
}).catch((err)=>{
    console.log(err.message);
});

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`)
})

const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    }
})

global.onlineUsers=new Map();

io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(data)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data)
        }
    })
    socket.on("delete-event",(data)=>{
        if(data.data[0].to){
            const sendUserSocket = onlineUsers.get(data.data[0].to);
            if(sendUserSocket){
                socket.to(sendUserSocket).emit("after-delete-event",data.data)
            }
        }
    })
    socket.on("like-event",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(sendUserSocket)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("after-like-event",data.data)
        }
    })
})