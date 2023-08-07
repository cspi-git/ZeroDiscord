(async function(){
    "use strict";

    // Dependencies
    const request = require("request-async")
    const fs = require("fs")

    // Variables
    const args = process.argv.slice(2)
    const results = []

    // Main
    if(!args.length) return console.log("usage: node index.js <ids> <token> <output>")
    if(!fs.existsSync(args[0])) return console.log("Unable to find the file that contains Discord ids.")
    if(!args[2]) return console.log("The output is invalid.")

    const ids = fs.readFileSync(args[0], "utf8").replace(/\r/g, "").split("\n")

    if(!ids.length) return console.log("The provided Discord ids file is empty.")

    console.log("Scraping the Discord ids bio, please wait.")
    for( const id of ids ){
        var response = await request(`https://discord.com/api/v9/users/${id}/profile`, {
            headers: {
                authorization: args[1]
            }
        })
        
        response = JSON.parse(response.body)
        if(response.hasOwnProperty("errors")) return console.log(`Invalid id detected. ${id}`)
        response = response.user
        results.push(`Username: ${response.username}\nID: ${id}\nBIO:\n${response.bio}\n`)
        console.log(`Successfully grabbed ${id} bio.`)
    }

    console.log("Saving the results, please wait.")
    fs.writeFileSync(args[2], results.join("\n===========================\n\n"), "utf8")
    console.log("Finished!")
}())