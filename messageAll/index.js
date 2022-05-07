"use strict";

// Dependencies
const discord = require("discord.js-selfbot")

// Variables
const token = process.argv.slice(2)[0]
const user = new discord.Client()

// Main
if(!token) return console.log("usage: node index.js <token>")

user.on("ready", ()=>{ 
    console.log("Selfbot is running.")
})

user.on("message", (message)=>{
    const messageArgs = message.content.split(" ")

    if(message.author.id == User.user.id){
        if(messageArgs[0] === "M$messageall"){
            message.delete()

            message.guild.members.cache.forEach(member =>{
                member.send(messageArgs.slice(1).join(" ")).then(()=>{
                    console.log(`Successfully sent the message to this user ${member.user.tag}`)
                }).catch(()=>{
                    console.log(`Failed to send the message to this user ${member.user.tag}`)
                })
            })
        }
    }
})

user.login(token).catch(()=>{
    console.log("Invalid token.")
    process.exit()
})