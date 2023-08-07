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
async function createThread(){
    var response = await request.post(`https://discord.com/api/v9/channels/${args.channelID}/threads`, {
        headers: {
            "content-type": "application/json",
            authorization: args.token
        },
        body: JSON.stringify({ name: args.threadName, type: 11, auto_archive_duration: 1440, location: "Thread Browser Toolbar" })
    })

    response = response.body

    if(response.indexOf('"archived": false') === -1){
        console.log("Unable to create thread, retrying in 2 seconds.")
        await delay(2000)
        return createThread()
    }

    console.log("Thread created.")
    await delay(999)
    
    index++
    if(index === args.amount){
        console.log("Finished!")
        process.exit()
    }
}

// Main
parser.add_argument("-ci", "--channelID", { help: "The target channel ID.", required: true })
parser.add_argument("-a", "--amount", { help: "The amount of thread to make.", required: true })
parser.add_argument("-tn", "--threadName", { help: "Thread name.", required: true })
parser.add_argument("-t", "--token", { help: "Discord account token to use.", required: true })

args = parser.parse_args()
args.amount = args.amount-1

console.log("Creating threads has started, please wait.")

for( let i = 0; i <= args.amount; i++ ){
    createThread()
}