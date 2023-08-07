"use strict";

// Dependencies
const { ArgumentParser } = require("argparse")
const request = require("request-async")
const delay = require("delay")

// Variables
const parser = new ArgumentParser()

var args;
var index = 0

// Functions
async function spam(){
    var response = await request.post(`https://discord.com/api/v9/channels/${args.channelID}/invites`, {
        headers: {
            "content-type": "application/json",
            authorization: args.token
        },
        body: JSON.stringify({ max_age: Math.floor(Math.random() * 604800), max_uses: 0, temporary: false })
    })
    response = response.body

    if(response.indexOf("Unknown Channel") !== -1){
        console.log("Invalid channelID.")
        process.exit()
    }

    if(response.indexOf("rate limited") !== -1){
        console.log("Rate limited detected. Retrying in 2 seconds.")
        await delay(2000)
        return spam()
    }

    console.log("Junk log sent.")
    await delay(999)
    index++

    if(index === args.amount){
        console.log("Finished!")
        process.exit()
    }
}

// Main
parser.add_argument("-ci", "--channelID", { help: "Any channel ID on the target server.", required: true })
parser.add_argument("-a", "--amount", { help: "The amount of junk log to send in the server's audit log.", required: true })
parser.add_argument("-t", "--token", { help: "Discord account token to use.", required: true })

args = parser.parse_args()
args.amount = args.amount-1

console.log("Sending the junk logs, please wait.")
for( let i = 0; i <= args.amount; i++ ) spam()