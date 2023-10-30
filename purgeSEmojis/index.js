"use strict";

// Dependencies
const { Client, Intents } = require("discord.js")

// Variables
const args = process.argv.slice(2)
const bot = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ] })

// Main
if(!args.length) return console.log("usage: node index.js <token> <guildID>")

bot.on("ready", async()=>{
    console.log("PurgeSEmojis is running...")
    const guild = bot.guilds.cache.get(args[1])
    if(!guild){
        console.log("Invalid guildID.")
        process.exit()
    }
    console.log("Scraping and deleting the server emojis, please wait...")
    await guild.emojis.fetch()

    for( const emoji of Array.from(guild.emojis.cache.values()) ){
        try{
            await emoji.delete()
            console.log(`Emoji ${emoji.name} successfully deleted.`)
        }catch{
            console.log(`Unable to delete emoji ${emoji.name} or has no permission to.`)
        }
    }

    console.log("Server emojis successfully deleted.")
    process.exit()
})

bot.login(args[0])