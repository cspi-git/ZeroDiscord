"use strict";

// Dependencies
const { Client } = require("discord.js-selfbot-v13")
const fs = require("fs")

// Variables
const args = process.argv.slice(2)
const user = new Client()

// Main
if(!args.length) return console.log("usage: node index.js <token> <serverID> <outputFile>")

user.on("ready", ()=>{
    console.log("Scraping server Discord members IDs, please wait...")
    const memberIDs = (await (await user.guilds.fetch(args[1])).members.fetch({ limit: 0, force: true })).filter(x => x.user.id !== null && !x.user.bot).map(r => r.user.id)
    fs.writeFileSync(args[3], memberIDs.join("\n"), "utf8")
    console.log("Finished.")
    process.exit()
})

user.login(args[0]).catch(()=>{
    console.log("Invalid token.")
})