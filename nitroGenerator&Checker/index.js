"use strict";

// Dependencies
const randomUserAgent = require("random-useragent")
const discordNitro = require("discordnitro")
const request = require("request-async")

// Variables
const args = process.argv.slice(2)

//Main
if(!args.length) return console.log("usage: node index.js <speed(Milliseconds)> <token>")
if(!args[0]) return console.log("Invalid speed.")
if(isNaN(args[0])) return console.log("speed is not a number.")
if(!args[1]) return console.log("Invalid token.")

console.log("Generating & Checking has started.")
setInterval(async function(){
    const code = discordNitro(1)[0]

    const response = await request(`https://discordapp.com/api/v9/entitlements/gift-codes/${code}?with_application=false&with_subscription_plan=true`, {
        headers: {
            "User-Agent": randomUserAgent.getRandom()
        }
    })

    try{
        if(response.statusCode === 200){
            console.log(`Valid nitro code: ${code}`)

            var response2 = await request(`https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`, {
                headers: {
                    authorization: args[1]
                }
            })
            response2 = response2.body

            if(response2.indexOf("redeemed already") !== -1){
                console.log(Chalk.red(`Nitro code ${code} is already redeemed.`))
            }else if(response2.indexOf("nitro") !== -1){
                console.log(Chalk.greenBright(`Nitro code ${code} claimed.`))
            }else{
                console.log(Chalk.red(`Unknown nitro code: ${code}`))
            }
        }else{
            console.log(`Invalid nitro code: ${code}`)
        }
    }catch{
        console.log(`Invalid nitro code: ${code}`)
    }
}, args[0])