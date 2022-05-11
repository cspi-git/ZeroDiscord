"use strict";

// Dependencies
const { ArgumentParser } = require("argparse")
const request = require("request-async")
const delay = require("delay")
const fs = require("fs")

// Variables
const parser = new ArgumentParser()

var messages = []
var args;
var endMessageID = 0

// Functions
async function getMessages(){
    await delay(2000)

    if(messages.length > args.amount){
        console.log("Saving the messages, please wait.")

        messages = messages.slice(0, args.amount)
        args.importable ? fs.writeFileSync(args.output, JSON.stringify(messages, null, 2), "utf8") : fs.writeFileSync(args.output, messages.join("\n"), "utf8")

        return console.log("Finished!")
    }

    var response = await request(endMessageID ? `https://discord.com/api/v9/channels/${args.channelID}/messages?before=${endMessageID}&limit=100` : `https://discord.com/api/v9/channels/${args.channelID}/messages?limit=100`, {
        headers: {
            authorization: args.token
        }
    })

    response = JSON.parse(response.body)

    for( const message of response ) if(message.content) args.importable ? messages.push({ username: message.author.username, avatar: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`, tag: message.author.discriminator, id: message.author.id, message: message.content }) : messages.push(`[${message.author.username}#${message.author.discriminator}][${message.author.id}][${message.timestamp}] ${message.content}`)

    endMessageID = response[response.length-1].id

    console.log(`${messages.length} messages scraped.`)
    getMessages()
}

//Main
parser.add_argument("-ci", "--channelID", { help: "The target channel ID.", required: true })
parser.add_argument("-a", "--amount", { help: "The amount of messages to save.", required: true })
parser.add_argument("-o", "--output", { help: "The output file in where to save the messages.", required: true })
parser.add_argument("-i", "--importable", { help: 'If "-i/--importable" value is true then the output will be saved in JSON that can be imported to a channel using "channelMessagesImporter".' })
parser.add_argument("-t", "--token", { help: "Discord account token to use.", required: true })

args = parser.parse_args()

console.log("Scraping the channel messages, please wait.")
getMessages()