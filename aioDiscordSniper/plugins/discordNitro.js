"use strict";

// Dependencies
const request = require("request-async")

// Main
async function check(config){
    var message = config.message

    if(message.content.indexOf("discord.gift") !== -1 || message.content.indexOf(".com/gift") !== -1){
        try{
            message = message.content.split("/")

            const code = message[message.length-1]

            console.log(`Discord nitro code found: ${code}`)

            request.post(`https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`, {
                headers: {
                    "Authorization": config.token
                }
            }, function(err, res, body){
                if(err) return console.log(`Unable to redeem Discord nitro code: ${code}`)

                if(body.indexOf("radeemed already") !== -1){
                    console.log(`Nitro code ${code} is already redeemed.`)
                }else if(body.indexOf("nitro") !== -1){
                    console.log(`Nitro code ${code} claimed.`)
                }else{
                    console.log(`Unknown nitro code: ${code}`)
                }
            })
        }catch{}
    }
}

module.exports = check