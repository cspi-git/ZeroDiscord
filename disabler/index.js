"use strict";

// Dependencies
const request = require("request-async")

// Variables
const token = process.argv.slice(2)[0]

// Functions
async function disable(){
    await request.patch("https://discord.com/api/v9/users/@me", {
        headers: {
            "content-type": "application/json",
            authorization: token
        },
        body: JSON.stringify({ bio: "disabled" })
    })

    console.log("The account has been disabled.")
}

// Main
if(!token) return console.log("Usage: node index.js <token>")
if(!/^(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})$/i.test(token[0])) return console.log("You provided an invalid Discord token")

disable()