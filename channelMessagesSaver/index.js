"use strict";

// Dependencies
const { ArgumentParser } = require("argparse")
const request = require("request-async")
const delay = require("delay")
const fs = require("fs")

// Variables
const parser = new ArgumentParser()
const messages = []

var args;
var endMessageID = 0

// Functions
async function getMessages(){
    await delay(2000)

    if(messages.length > args.amount){
        console.log("Saving the messages, please wait.")
        fs.writeFileSync(args.output, messages.slice(0, args.amount).join("\n"), "utf8")
        return console.log("Finished!")
    }

    var response = await request(endMessageID ? `https://discord.com/api/v9/channels/${args.channelID}/messages?before=${endMessageID}&limit=100` : `https://discord.com/api/v9/channels/${args.channelID}/messages?limit=100`, {
        headers: {
            authorization: args.token
        }
    })

    response = JSON.parse(response.body)

    for( const message of response ) if(message.content)  messages.push(`[${message.author.username}#${message.author.discriminator}][${message.author.id}][${message.timestamp}] ${message.content}`)

    endMessageID = response[response.length-1].id

    console.log(`${messages.length} messages scraped.`)
    getMessages()
}

//Main
parser.add_argument("-ci", "--channelID", { help: "The target channel ID.", required: true })
parser.add_argument("-a", "--amount", { help: "The amount of messages to save.", required: true })
parser.add_argument("-o", "--output", { help: "The output file in where to save the messages.", required: true })
parser.add_argument("-t", "--token", { help: "Discord account token to use.", required: true })

args = parser.parse_args()

console.log("Scraping the channel messages, please wait.")
getMessages()