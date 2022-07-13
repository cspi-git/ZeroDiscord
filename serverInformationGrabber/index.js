"use strict";

// Dependencies
const request = require("request-async")

// Variables
const args = process.argv.slice(2)

// Functions
async function grabServerInformation(){
    try{
        console.log("Grabbing the server information, please wait.")

        var response = await request(`https://discord.com/api/v6/guilds/${args[0]}`, {
            headers: {
                authorization: args[1]
            }
        })
    
        response = JSON.parse(response.body)

        console.log(`
Server icon: https://cdn.discordapp.com/icons/${response.id}/${response.icon}.png
Server splash: ${response.splash}
Server discovery splash: ${response.discovery_splash}
Server id: ${response.id}
Server name: ${response.name}
Server description: ${response.description}
Server vanity: ${response.vanity_url_code}
Server owner id: ${response.owner_id}
Server verification level: ${response.verification_level}
Server emojis amount: ${response.emojis.length}
Server stickers amount: ${response.stickers.length}
Server roles amount: ${response.roles.length}
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