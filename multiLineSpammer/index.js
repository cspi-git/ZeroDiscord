"use strict";

// Dependencies
const { ArgumentParser } = require("argparse")
const request = require("request-async")

// Variables
const parser = new ArgumentParser()

var payload;
var args;

// Functions
function generateNewLines(amount){
    var result = ""

    for( let i = 0; i <= amount; i++ ) result += "\n"

    return result
}

async function send(i){
    var response = await request.post(`https://discord.com/api/v9/channels/${args.channelID}/messages`, {
        headers: {
            "content-type": "application/json",
            authorization: args.token
        },
        body: JSON.stringify({ content: payload, nonce: `AAAAAAAA${Math.floor(Math.random() * 9999999999)}` })
    })

    response = JSON.parse(response.body)

    if(response.hasOwnProperty("retry_after")){
        return setTimeout(()=>{
            send(i)
        }, response.retry_after)
    }else{
        console.log("New lines successfully sent.")
    }

    if(i++ === args.amount-1){
        console.log("Finished.")
        process.exit()
    }
}

// Main
parser.add_argument("-ci", "--channelID", { help: "The target channel ID.", required: true })
parser.add_argument("-nla", "--newLinesAmount", { help: "The amount of new lines to generate.", required: true })
parser.add_argument("-a", "--amount", { help: "The amount to spam the new lines.", required: true })
parser.add_argument("-t", "--token", { help: "The Discord account token to use.", required: true })

args = parser.parse_args()

payload = `\nLOL${generateNewLines(args.newLinesAmount)}LOL\n`

for( let i = 0; i <= args.amount-1; i++ ){
    send(i)
}