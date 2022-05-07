"use strict";

// Dependencies
const { ArgumentParser } = require("argparse")
const discord = require("discord.js-selfbot")

// Variables
const parser = new ArgumentParser()
const user = new discord.Client()

var payload;
var args;

// Functions
function generateNewLines(amount){
    var result = ""

    for( let i = 0; i <= amount; i++ ){
        result += "\n"
    }

    return result
}

function send(){
    user.guilds.find(guild => guild.id == args.guildID).channels.find(channel => channel.id == args.channelID).send(payload).then(()=>{
        console.log("New lines successfully sent.")

        if(i === args.amount){
            console.log("Finished.")
            process.exit()
        }
    }).catch(()=>{
        console.log("Unable to send new lines the guild/channel id might be invalid.")

        if(i === args.amount){
            console.log("Finished.")
            process.exit()
        }
    })
}

// Main
parser.add_argument("-gi", "--guildID", { help: "The target channel guild ID.", required: true })
parser.add_argument("-ci", "--channelID", { help: "The target channel ID.", required: true })
parser.add_argument("-nla", "--newLinesAmount", { help: "The amount of new lines to generate.", required: true })
parser.add_argument("-a", "--amount", { help: "The amount to spam the new lines.", required: true })
parser.add_argument("-t", "--token", { help: "The Discord account token to use.", required: true })

args = parser.parse_args()

payload = `\nLOL${generateNewLines(Self_Args[1])}LOL\n`

user.on("ready", ()=>{
    for( let i = 0; i <= args.amount-1; i++ ){
        send()
    }
})

user.login(args.token)