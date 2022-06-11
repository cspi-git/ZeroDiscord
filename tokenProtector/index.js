"use strict";

// Dependencies
const chokidar = require("chokidar")
const delay = require("delay")
const path = require("path")
const os = require("os")
const Fs = require("fs")

// Startup
if(!Fs.existsSync(`C:\\Users\\${os.userInfo().username}\\AppData\\Roaming\\discord`)){
    console.log("It seems like you don't have Discord installed in your PC.")
    process.exit()
}

// Variables
const homeDir = os.userInfo().homedir

const tokenProtector = {
    directoriesToWatch: [
        `${homeDir}\\AppData\\Roaming\\discord\\Local Storage\\leveldb`,
        `${homeDir}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb`
    ],
    regex: new RegExp(/(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})/, "g"),
    checkEvery: 10000 //Milliseconds
}

// Functions
function directoryFiles(dir, done) {
    var results = []

    Fs.readdir(dir, function (err, list) {
        if (err) return done(err)

        var list_length = list.length

        if (!list_length) return done(null, results)

        list.forEach(function (file) {
            file = path.resolve(dir, file)

            Fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    directoryFiles(file, function (err, res) {
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

tokenProtector.tokensRemover = function(filePath){
    Fs.readFile(filePath, "utf8", function(err, data){
        if(err){
            console.log(`Unable to read file ${filePath}`)
            return
        }

        if(data.match(tokenProtector.regex)){
            console.log(`Tokens found in file ${filePath}`)
    
            data = data.replace(tokenProtector.regex, "")
    
            Fs.writeFileSync(filePath, data, "utf8")
            console.log(`Tokens in file ${filePath} are removed.`)
        }else{
            console.log(`No tokens found in file ${filePath}`)
        }
    })
}

tokenProtector.watch_directory = function(directoryPath){
    if(!Fs.existsSync(directoryPath)){
        console.log(`Directory path ${directoryPath} doesn't exist, therefore skipping the directory.`)
        return
    }

    console.log(`Watching directory ${directoryPath}`)

    const directoryFiles = Fs.readdirSync(directoryPath, "utf8")
    const directoryWatcher = chokidar.watch(directoryPath, {
        awaitWriteFinish: true
    })

    directoryWatcher.on("change", (path)=>{
        console.log(`Changes detected in file ${path}`)

        console.log(`Checking any tokens in file ${path}`)
        tokenProtector.tokensRemover(path)
    })

    console.log(`Checking directory ${directoryPath} files for any tokens.`)

    for( const file of directoryFiles ){
        tokenProtector.tokensRemover(`${directoryPath}\\${file}`)
    }
}

tokenProtector.check = async function(){
    console.log(`Discord files checking will start in ${tokenProtector.checkEvery} milliseconds.`)
    await delay(tokenProtector.checkEvery)

    console.log("Gathering Discord files.")
    directoryFiles(`${homeDir}\\AppData\\Roaming\\discord`, function(err, files){
        if(err){
            process.exit()
        }
    
        console.log("Checking Discord files.")
        files.forEach(file =>{
            var data = Fs.readFileSync(file, "utf8")
            
            if(data.match(tokenProtector.regex)){
                data = data.replace(tokenProtector.regex)

                Fs.writeFile(file, data, "utf8", function(err){
                    if(err){
                        console.log(`Unable to remove some Discord tokens in ${file}`)
                        return
                    }

                    console.log(`Discord tokens in file ${file} has been removed.`)
                })
            }
        })

        console.log("Checking is finished.")
        tokenProtector.check()
    })
}

// Main
tokenProtector.check()

for( const directory of tokenProtector.directoriesToWatch ) tokenProtector.watch_directory(directory)