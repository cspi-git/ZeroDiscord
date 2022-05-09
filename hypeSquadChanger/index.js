"use strict";

// Dependencies
const request = require("request-async")
const fs = require("fs")

// Variables
const args = process.argv.slice(2)

// Functions
async function changeAccountHypeSquad(){
    const response = await request.post("https://discordapp.com/api/v6/hypesquad/online", {
        headers: {
            "content-type": "application/json",
            authorization: args[0]
        },
        body: JSON.stringify({ house_id: args[1] })
    })

    response.statusCode === 204 ? console.log("Account hypesquad successfully changed.") : console.log("Unable to change the account hypesquad.")
}

// Main
if(!args.length) return console.log("usage: node index.js <token> <hypeSquadID>\nHypeSquads: 1 = Bravery, 2 = Brilliance, 3 = Balance")
if(!args[1])  return console.log("hypeSquadID is invalid.")

args[1] = +args[1]

if([1, 2, 3].indexOf(args[1]) === -1) return console.log("hypeSquadID is invalid.")

changeAccountHypeSquad()