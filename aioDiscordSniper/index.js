"use strict";

// Dependencies
const discord = require("discord.js-selfbot")
const fs = require("fs")

// Variables
const token = process.argv.slice(2)[0]
const user = new discord.Client()

const plugins = fs.readdirSync("./plugins").map((f) => `./plugins/${f}`)

// Main
if(!token) return console.log("usage: node index.js <token>")

user.on("ready", ()=>{
    console.log("AIO Sniper is running.")
})

user.on("message", (message)=>{
    for( const plugin of plugins ) require(plugin)({ message: message, token: token })
})

user.login(token)