"use strict";

// Dependencies
const discordBackup = require("discord-backup")
const discord = require("discord.js")
const path = require("path")

// Variables
var dsb = {
    access: [
        882891618473091082
    ],
    token: ""
}

const bot = new discord.Client()

// Main
discordBackup.setStorageFolder(path.join(__dirname, "backups"))

bot.on("ready", ()=>{
    console.log(`Kuka is running.`)
})

bot.on("message", async(message)=>{
    if(!message.guild) return
    if(dsb.access.indexOf(+message.author.id) === -1) return

    const guild = message.guild
    const messageArgs = message.content.split(" ")

    if(message.content === "dsb.backup"){
        message.reply("Saving the server, please wait.")
        discordBackup.create(guild).then((backupID)=>{
            message.reply(`Server successfully saved. ID: ${backupID.id}`)
        })
    }else if(messageArgs[0] === "dsb.restore"){
        const backupID = messageArgs[1]
        const backups = await discordBackup.list()

        if(!backupID) return message.reply("usage: dsb.restore <backupID>")
        if(backups.indexOf(backupID) === -1) return message.reply("Invalid BackupID.")

        discordBackup.fetch(backupID).then(async()=>{
            message.reply("Restoring the specified backup, please wait.")

            discordBackup.load(backupID, guild).then(()=>{
                discordBackup.remove(backupID)
                message.reply("Backup successfully restored.")
            })
        })
    }
})

bot.login(dsb.token)