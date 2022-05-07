"use strict";

// Dependencies
const discord = require("discord.js")

// Variables
const args = process.argv.slice(2)

// Main
if(!args.length) return console.log("node index.js <webhookLink> <message>")
if(!args[1]) return console.log("Invalid message to spam.")

const reconstructWL = args[0].split("/")
const webhookID = reconstructWL[5]
const webhookToken = reconstructWL[6]

const webhook = new discord.WebhookClient(webhookID, webhookToken)

console.log("Spammer has started.")
setInterval(function(){
    webhook.send(args.slice(1).join(" "))
}, 100)