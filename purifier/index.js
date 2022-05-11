"use strict";

// Dependencies
const rra = require("recursive-readdir-async")
const { runJobs } = require("parallel-park")
const chalk = require("chalk")
const os = require("os")
const fs = require("fs")

// Variables
const database = require("./database.json")
const detection = database.detection

const homeDir = os.homedir()
const local = `${homeDir}\\AppData\\Local\\Discord`
const roaming = `${homeDir}\\AppData\\Roaming\\discord`

var positive = 0
var canBeFalsePositive = 0
var type = 0

// Functions
function log(type, path, rate){
    if(type === "warn"){
        positive++
        console.log(`[${chalk.redBright("WARN")}] ${path}`)
    }else if(type === "fp"){
        canBeFalsePositive++
        console.log(`[${chalk.redBright("WARN")}][${chalk.yellowBright("CAN BE FALSE POSITIVE")}][${rate}] ${path}`)
    }
}

function detected(path){
    var fp = false

    for( const object of detection.falsePositives ){
        if(path.indexOf(object.identifier) !== -1){
            fp = true
            log("fp", path, object.rate)
        }
    }

    if(!fp) log("warn", path)
}

function scanDirectory(directory){
    return new Promise(async(resolve)=>{
        const files = await rra.list(directory, { recursive: true, realPath: true, extensions: true }, function(object){
            const ignoreExtensions = [".log", ".node"]
            const path = object.fullname

            for( const extension of ignoreExtensions ) if(object.extension.indexOf(extension) !== -1) return true
            if(path.indexOf("/discord/Cache") !== -1 || path.indexOf("/discord/Code Cache/") !== -1) return true
        })
    
        await runJobs(
            files.map((f) => f.fullname),
            async(path, index, max)=>{
                try{
                    const data = fs.readFileSync(path, "utf8")
    
                    for( const text of detection.texts ) if(data.indexOf(text) !== -1) detected(path)
                }catch{}
            }
        )

        resolve()
    })
}

async function start(){
    await scanDirectory(type ? roaming : local)

    if(type > 0){
        if(!positive && !canBeFalsePositive) console.log("It seems like your Discord is clean.")
        
        positive ? console.log(`${positive} positive malicious files found.`) : console.log(`${canBeFalsePositive} can be false positive malicious files found.`)

        return console.log("Finished!")
    }

    type++
    start()
}

// Main
console.log("Scanning has started.")
start()