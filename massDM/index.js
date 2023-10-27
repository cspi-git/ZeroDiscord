"use strict";

// Dependencies
const discord = require("discord.js-selfbot-v13")
const bottleneck = require("bottleneck")
const fs = require("fs")

// Variables
const args = process.argv.slice(2)
const user = new discord.Client()
const threads = new bottleneck.default({
    maxConcurrent: 1,
    minTime: 1500
})
const message = fs.readFileSync(args[2], "utf8")

// Functions
async function send(guild, memberID){
    try{
        await guild.members.cache.get(memberID).send(message)
        console.log(`Successfully sent message to ${memberID}`)
    }catch{
        console.log(`Unable to send message to ${memberID}`)
    }
}

// Main
if(!args.length) return console.log("usage: node index.js <token> <guildID> <inputFile>")

user.on("ready", async()=>{ 
    console.log("massDM is running.")
    console.log("Scraping the guild members, please wait...")
    const guild = user.guilds.cache.get(args[1])
    await guild.members.fetch({ limit: 0 })
    console.log("Sending the message to the guild members, please wait...")
    guild.members.cache.filter((m)=>m.id!==user.user.id).forEach((member)=>{
        threads.schedule(send, guild, member.id)
    })
})

user.login(args[0]).catch(()=>{
    console.log("Invalid token.")
    process.exit()
})