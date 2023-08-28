"use strict";

// Dependencies
const request = require("request-async")
const jsonHood = require("json-hood")

// npm i request-async json-hood

// Variables
let inviteCode = process.argv.slice(2)[0]

// Functions
async function getInviteCodeInformation(){
    var response = await request(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`)
    response = JSON.parse(response.body)

    jsonHood.printJSONasArrowDiagram(response)
}

// Main
if(!inviteCode) return console.log("usage: node index.js <inviteCode>")

// If user gives a link, remove the link and keep the invite code
inviteCode = inviteCode.replace(/(https?:\/\/)?(www\.)?(discord\.gg|discord\.com\/invite)\//, "")

// console.log("Trying code:" + inviteCode)

getInviteCodeInformation()