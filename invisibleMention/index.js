"use strict";

// Dependencies
const { ArgumentParser } = require("argparse")
const request = require("request-async")

// Variables
const parser = new ArgumentParser()

var args;

// Functions
async function mentionUser(){
    var payload = `${args.maskMessage}:sunglasses: ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||||||<@${args.userID}>`

    await request.post(`https://discordapp.com/api/v6/channels/${args.channelID}/messages`, {
        headers: {
            "content-type": "application/json",
            authorization: args.token
        },
        body: JSON.stringify({ content: payload })
    })

    console.log("Invisible mention successfully sent.")
}

// Main
parser.add_argument("-ci", "--channelID", { help: "The target channel ID.", required: true })
parser.add_argument("-ui", "--userID", { help: "The target user ID.", required: true })
parser.add_argument("-mm", "--maskMessage", { help: "The message to mask the mention.", required: true })
parser.add_argument("-t", "--token", { help: "The Discord user token to use.", required: true })

args = parser.parse_args()

mentionUser()