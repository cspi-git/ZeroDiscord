"use strict";

// Dependencies
const { ArgumentParser } = require("argparse") 
const discord = require("discord.js-selfbot")
const request = require("request-async")
const delay = require("delay")
const fs = require("fs")

// Variables
const parser = new ArgumentParser()
const token = process.argv.slice(2)[0]
const user = new discord.Client()

var args;
var index = 0

// Main
parser.add_argument("-m", "--messages", { help: "The file path of the messages(Dictionary) to use.", required: true })
parser.add_argument("-d", "--delay", { help: "The delay to change your Discord status message(Seconds).", required: true })
parser.add_argument("-t", "--token", { help: "Discord account token to use.", required: true })

args = parser.parse_args()

if(!fs.existsSync(args.messages)) return console.log("Unable to find messages file path.")

const messages = fs.readFileSync(args.messages, "utf8").replace(/\r/g, "").split("\n")

user.on("ready", function(){
    console.log("Status message changer is running.")

    setInterval(async function(){
        if(index === messages.length) index = 0
        
        const response = await request.patch("https://discord.com/api/v9/users/@me/settings", {
            headers: {
                "content-type": "application/json",
                authorization: args.token
            },
            body: JSON.stringify({ custom_status: { text: messages[index] } })
        })

        response.statusCode === 200 || response.body.indexOf('"locale":') !== -1 ? console.log(`Status has been changed to ${messages[index]}`) : console.log(`Unable to change status to ${messages[index]}`)

        index++
    }, 1000 * args.delay)
})

user.login(args.token)