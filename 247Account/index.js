"use strict";

require("dotenv").config()

// Dependencies
const discord = require("discord.js-selfbot-v13")
const express = require("express")

// Variables
const web = express()
const port = process.env.PORT || 8080

const token = process.env.TOKEN
const user = new discord.Client()

// Main
///* Web
web.use("", (req, res)=>res.send("Ping."))

///* Discord
user.on("ready", ()=>{
    user.user.setPresence({ status: "online" })
    console.log("The account is now online. Make sure to use a hoster that runs 24/7")
})

///* Listeners
web.listen(port, ()=>console.log(`Server is running. Port: ${port}`))
user.login(token)