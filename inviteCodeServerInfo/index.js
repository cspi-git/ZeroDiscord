"use strict";

// Dependencies
const request = require("request-async")
const jsonHood = require("json-hood")

// Variables
const inviteCode = process.argv.slice(2)[0]

// Functions
async function getInviteCodeInformation(){
    var response = await request(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`)
    response = JSON.parse(response.body)

    jsonHood.printJSONasArrowDiagram(response)
}

// Main
if(!inviteCode) return console.log("usage: node index.js <inviteCode>")

getInviteCodeInformation()