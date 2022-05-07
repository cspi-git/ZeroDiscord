"use strict";

// Dependencies
const request = require("request-async")

// Variables
const args = process.argv.slice(2)

// Functions
async function grabUserInformation(){
    try{
        var response = await request(`https://discord.com/api/v9/users/${args[0]}/profile`, {
            headers: {
                authorization: args[1]
            }
        })

        response = JSON.parse(response.body)

        const user = response.user
        const connectedAccounts = response.connected_accounts

        console.log(`
Username: ${user.username}
ID: ${user.id}
Tag: ${user.username}#${user.discriminator}
Tag number: ${user.discriminator}
BIO: ${user.bio}
        `)

        for( const connection of connectedAccounts ){
            console.log(`Platform: ${connection.type}
Name: ${connection.name}
ID: ${connection.id}
Verified: ${connection.verified}
`)
        }
    }catch{
        console.log("Make sure the userID & token is valid.")
    }
}

// Main
if(!args.length) return console.log("usage: node index.js <userID> <token>")
if(!args[1]) return console.log("Invalid token.")

if(!/(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})/i.test(args[1])) return console.error("You did not provide a valid token.")

grabUserInformation()