"use strict";

// Dependencies
const request = require("request-async")
const fs = require("fs")

// Variables
var webhooks = process.argv.slice(2)[0]
var index = 0

// Function
async function deleteWebhook(webhook){
    try{
        const response = await request(webhook, { method: "delete" })

        response.statusCode === 204 ? console.log(`Webhook successfully deleted. ${webhook}`) : console.log(`Failed to delete webhook. ${webhook}`)
    }catch{
        console.log(`Failed to delete webhook. ${webhook}`)
    }

    index++

    if(index === webhooks.length) return console.log("Finished!")
}

// Main
if(!webhooks) return console.log("usage: node index.js <webhooks>")
if(!fs.existsSync(webhooks)) return console.log("Unable to find the file that contains webhooks link.")

webhooks = fs.readFileSync(webhooks, "utf8").replace(/\r/g, "").split("\n")

for( const webhook of webhooks ) deleteWebhook(webhook)