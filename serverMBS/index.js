"use strict";

// Dependencies
const discord = require("discord.js-selfbot-v13")
const fs = require("fs")

// Variables
const args = process.argv.slice(2)
const client = new discord.Client()
const bios = []
var index = 0

// Functions
function check(){
    index++
    if(index === bios.length){
        console.log("Finished.")
        return process.exit()
    }
}

// Main
if(!args.length) return console.log("usage: node index.js <token> <serverID> <outputFile>")

client.on("ready", async()=>{
    console.log(`Successfully login as ${client.user.tag}`)
    console.log("Scraping the guild members pfp, please wait...")

    const guild = client.guilds.cache.get(args[1])
    const members = await guild.members.fetch()
    
    console.log("Scraping BIOs, please wait...")
    for( const member of members.values() ) if(member.user.bio) bios.push(member.user.bio)
    
    setTimeout(()=>{
        fs.writeFileSync(args[2], bios.join("\n"), "utf8")
        console.log("Finished.")
        process.exit()
    }, 5 * 1000)
})

client.login(args[0])