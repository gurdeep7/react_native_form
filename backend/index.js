const express = require("express")
const { register, get } = require("./controller/user.controller")
const cors = require("cors");


const app = express()
app.use(cors())
app.use(express.json())

app.post("/register",register)

app.get("/get",get)

app.get("/", async (req,res)=>{
    res.send("Listening")
})

module.exports = app;