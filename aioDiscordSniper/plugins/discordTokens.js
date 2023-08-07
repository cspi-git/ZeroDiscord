"use strict";

// Main
function check(config){
    const discordTokens = message.content.match(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}|mfa\.[\w-]{84}/g)

    if(discordTokens) console.log(`Discord tokens found: ${discordTokens.toString().replace(",", ", ")}`)
}

module.exports = check