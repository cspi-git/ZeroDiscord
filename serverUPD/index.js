"use strict";

// Dependencies
const fileDownloader = require("nodejs-file-downloader")
const discord = require("discord.js-selfbot-v13")
const bottleneck = require("bottleneck").default

// Variables
const args = process.argv.slice(2)
const client = new discord.Client()
const threads = new bottleneck({
    maxConcurrent: 50,
    minTime: 1000
})
const pfps = []
var index = 0

// Functions
async function download(url, out){
    try{
        const downloader = new fileDownloader({
            url: url,
            fileName: url.match(/\w+.png/)[0],
            directory: out
        })

        await downloader.download()

        console.log(`Status: Success | Link: ${url}`)
    }catch{
        console.log(`Status: Failed | Link: ${url}`)
    }

    index++

    if(index === pfps.length){
        console.log("Finished.")
        return process.exit()
    }
}

// Main
if(!args.length) return console.log("usage: node index.js <token> <serverID> <outputDir>")

client.on("ready", async()=>{
    console.log(`Successfully login as ${client.user.tag}`)
    console.log("Scraping the guild members pfp, please wait...")

    const guild = client.guilds.cache.get(args[1])
    const members = await guild.members.fetch()

    members.forEach((member)=>{
        var pfp = member.user.displayAvatarURL()

        if(pfp.match("/embed/avatars/")) return

        pfp = pfp.replace(".webp", ".png")

        pfps.push(pfp)
        threads.schedule(download, pfp, args[2])
    })
})

client.login(args[0])