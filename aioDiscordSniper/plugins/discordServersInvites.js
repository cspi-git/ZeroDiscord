"use strict";

// Main
function check(config){
    const serversInvites = config.message.content.match(/discord.com.[\w-]{8,}|discord.gg.[\w-]{8,}/g)

    if(serversInvites) console.log(`Discord server invites found: ${serversInvites.toString().replace(",", ", ")}`)
}

//Exporter
module.exports = check