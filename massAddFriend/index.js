"use strict";

// Dependencies
const discord = require("discord.js-selfbot-v13")
const bottleneck = require("bottleneck")

// Variables
const args = process.argv.slice(2)
const client = new discord.Client()
const threads = new bottleneck.default({
    maxConcurrent: 1,
    minTime: 3000
})

// Functions
function addFriend(member){
    try{
        member.user.sendFriendRequest().catch(()=>{})
        console.log(`Successfully send friend request to ${member.user.tag}`)
    }catch{
        console.log(`Unable to send friend request to ${member.user.tag}, retrying...`)
        setTimeout(()=>addFriend(member), 5 * 1000)
    }
}

// Main
if(!args.length) return console.log("usage: node index.js <token> <guildID>")

client.on("ready", async()=>{
    console.log("Successfully login.")
    console.log("Fetching guild members, please wait...")
    const guild = client.guilds.cache.get(args[1])
    await guild.members.fetch()
    console.log("Sending them friend requests, please wait...")
    guild.members.cache.filter((m)=>!m.user.bot&&m.user.tag!==client.user.tag).forEach((member)=>{threads.schedule(addFriend, member)})
})

client.login(args[0])