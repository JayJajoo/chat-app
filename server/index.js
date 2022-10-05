const userRoutes = require("./routes/userRoutes")

const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const app=express();
require("dotenv").config();

app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)

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