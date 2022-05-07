"use strict";

// Dependencies
const request = require("request-async")

// Variables
const args = process.argv.slice(2)

// Functions
async function grabServerInformation(){
    try{
        console.log("Grabbing the server information, please wait.")

        var guild = await request(`https://discord.com/api/v6/guilds/${args[0]}`, {
            headers: {
                authorization: args[1]
            }
        })
    
        guild = JSON.parse(guild.body)
    
        console.log(`
Server icon: https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png
Server splash: ${guild.splash}
Server discovery splash: ${guild.discovery_splash}
Server id: ${guild.id}
Server name: ${guild.name}
Server description: ${guild.description}
Server vanity: ${guild.vanity_url_code}
Server owner id: ${guild.owner_id}
Server verification level: ${guild.verification_level}
Server emojis amount: ${guild.emojis.length}
Server stickers amount: ${guild.stickers.length}
Server roles amount: ${guild.roles.length}
Finished!`)
    }catch{
        console.log("Invalid token/guildId.")
    }
}

// Main
if(!args.length) return console.log("usage: node index.js <guildId> <token>")
if(!args[0]) return console.log("Invalid guildId.")
if(isNaN(args[0])) return console.log("guildId is not a number.")
if(!args[1]) return console.log("Invalid token.")

grabServerInformation()