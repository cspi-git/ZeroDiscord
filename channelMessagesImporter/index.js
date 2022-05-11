"use strict";

// Dependencies
const request = require("request-async")
const fs = require("fs")

// Variables
const args = process.argv.slice(2)

var index = 0
var messages;

// Functions
async function importMessages(){
    const message = messages[index]

    try{
        var response = await request.post(args[0], {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ username: message.username, avatar_url: message.avatar, content: message.message })
        })
    
        response = JSON.parse(response.body)
    
        if(response.hasOwnProperty("retry_after")){
            console.log(`Retrying after ${response.retry_after} ms`)
    
            setTimeout(function(){
                importMessages()
            }, response.retry_after)
            
            return
        }
    }catch{}

    if(index === messages.length) return console.log("Finished!")

    console.log("A message has been imported.")
    index++
    importMessages()
}

// Main
if(!args.length) return console.log("usage: node index.js <webhookLink> <messages>")
if(!fs.existsSync(args[1])) return console.log('The file that contains messages exported from "channelMessagesSaver" is invalid.')

messages = JSON.parse(fs.readFileSync(args[1], "utf8"))

console.log("Importing the messages, please wait.")
importMessages()